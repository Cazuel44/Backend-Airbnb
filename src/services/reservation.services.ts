import { IReservation } from "../types/reservation.js";
import Reservation from "../models/reservation.js";
import { CreateReservationInput } from "../schemas/reservation.schema.js";
import { AppError } from "../utils/app-error.js";
import Property from "../models/Property.js";


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

export default { createReservation };