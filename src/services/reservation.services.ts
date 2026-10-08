import { IReservation, IReservationWithProperty } from "../types/reservation.js";
import Reservation from "../models/Reservation.js";
import { CreateReservationInput } from "../schemas/reservation.schema.js";
import { AppError } from "../utils/app-error.js";
import Property from "../models/Property.js";
import { IProperty } from "../types/property.js";


const createReservation = async (data: CreateReservationInput, userId: string): Promise<IReservation> => {
    
    const property = await Property.findById(data.property);

    if (!property) {
        throw new AppError("Propiedad no encontrada", 404);
    }

    if (data.checkOut <= data.checkIn) {
        throw new AppError("La fecha de salida debe ser posterior a la fecha de entrada", 400);
    }

    const existingReservation = await Reservation.findOne({
        property: data.property,
        status: { $ne: "cancelled" },
        checkIn: { $lt: data.checkOut },
        checkOut: { $gt: data.checkIn }
    });

    if (existingReservation) {
        throw new AppError("La propiedad no está disponible para esas fechas", 409);
    }

    // calculo de dias/noches totales
    const nights = (data.checkOut.getTime() - data.checkIn.getTime()) / (1000 * 60 * 60 * 24);
    //calculo del precio total
    const totalPrice = property.price * nights ;

    const reservation = await Reservation.create({
        user: userId,
        property: data.property,
        checkIn: data.checkIn,
        checkOut: data.checkOut,
        totalPrice: totalPrice,
        status: "confirmed"
    });

    return reservation.toObject();
}

const getReservationsByUser = async (userId: string): Promise<IReservationWithProperty[]> => {
    const reservations = await Reservation.find({ user: userId }).populate<{property: IProperty}>("property");
    return reservations.map(reservation => reservation.toObject());
}

const getReservationById = async (reservationId: string, userId: string): Promise<IReservationWithProperty> => {

    const reservation = await Reservation.findById(reservationId).populate<{ property: IProperty }>("property");

    if (!reservation) {
        throw new AppError("Reserva no encontrada", 404);
    }

    if (reservation.user.toString() !== userId) {
        throw new AppError("No tienes permisos para ver esta reserva", 403);
    }

    return reservation.toObject();
}

export default { createReservation, getReservationsByUser, getReservationById };