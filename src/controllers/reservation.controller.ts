import { Request, Response, RequestHandler } from 'express';
import reservationServices from '../services/reservation.services.js';
import { CreateReservationInput } from '../schemas/reservation.schema.js';
import { AppError } from '../utils/app-error.js';

export const createReservation = async (req: Request, res: Response): Promise<void>=>{
    const userId = req.userId;
    const reservationData: CreateReservationInput = req.body;

    if (!userId) {
        throw new AppError("Usuario no autenticado", 401);
    }

    const reservation = await reservationServices.createReservation(reservationData, userId);

    res.status(201).json({
        message: "Reserva creada exitosamente",
        reservation
    });
}