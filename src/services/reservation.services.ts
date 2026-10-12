import { IReservation, IReservationWithProperty } from "../types/reservation.js";
import Reservation from "../models/Reservation.js";
import { CreateReservationInput, UpdateReservationInput } from "../schemas/reservation.schema.js";
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

    // funcion para verificar si la propiedad ya tiene una reserva en las fechas seleccionadas
    const existingReservation = await Reservation.findOne({
        property: data.property,
        status: { $ne: "cancelled" }, // estado not equal(distinto de) = cancelado
        checkIn: { $lt: data.checkOut }, //less than (menor que)
        checkOut: { $gt: data.checkIn } // greater than (mayor que)
    });

    if (existingReservation) {
        throw new AppError("La propiedad no está disponible para esas fechas", 409);
    }

    // calculo de dias/noches totales
    const nights = (data.checkOut.getTime() - data.checkIn.getTime()) / (1000 * 60 * 60 * 24);
    //calculo del precio total
    const totalPrice = property.price * nights;

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
    const reservations = await Reservation.find({ user: userId }).populate<{ property: IProperty }>("property");
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

const updateReservation = async (reservationId: string, userId: string, data: UpdateReservationInput): Promise<IReservationWithProperty> => {

    const reservation = await Reservation.findById(reservationId).populate<{ property: IProperty }>("property");

    if (!reservation) {
        throw new AppError("Reserva no encontrada", 404);
    }

    if (reservation.user.toString() !== userId) {
        throw new AppError("No tienes permisos para actualizar esta reserva", 403);
    }

    if (reservation.status === "cancelled") {
        throw new AppError("No se puede modificar una reserva cancelada", 400);
    }

    const checkIn = data.checkIn ?? reservation.checkIn;
    const checkOut = data.checkOut ?? reservation.checkOut;

    if (checkOut <= checkIn) {
        throw new AppError("La fecha de salida debe ser posterior a la fecha de entrada", 400);
    }

    const existingReservation = await Reservation.findOne({
        _id: { $ne: reservationId },
        property: reservation.property._id,
        status: { $ne: "cancelled" },
        checkIn: { $lt: checkOut },
        checkOut: { $gt: checkIn }
    });

    if (existingReservation) {
        throw new AppError("La propiedad no está disponible para esas fechas", 409);
    }


    // calculo de dias/noches totales
    const nights = (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24);
    //calculo del precio total
    const totalPrice = reservation.property.price * nights;

    reservation.checkIn = checkIn;
    reservation.checkOut = checkOut;
    reservation.totalPrice = totalPrice;

    await reservation.save();
    return reservation.toObject();
}; // falta avanzar el controller

const cancelReservation = async (reservationId: string, userId: string): Promise<IReservationWithProperty> => {

    const reservation = await Reservation.findById(reservationId).populate<{ property: IProperty }>("property");

    if (!reservation) {
        throw new AppError("Reserva no encontrada", 404);
    }

    if (reservation.user.toString() !== userId) {
        throw new AppError("No tienes permisos para cancelar esta reserva", 403);
    }

    if (reservation.status === "cancelled") {
        throw new AppError("La reserva ya está cancelada", 400);
    }

    reservation.status = "cancelled";
    await reservation.save();
    return reservation.toObject();
};

export default { createReservation, getReservationsByUser, getReservationById, updateReservation, cancelReservation };