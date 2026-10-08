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

export const getReservationsByUser = async (req: Request, res: Response): Promise<void> => {
    const userId = req.userId;

    if (!userId) {
        throw new AppError("Usuario no autenticado", 401);
    }

    const reservations = await reservationServices.getReservationsByUser(userId);

    res.status(200).json({
        message: "Reservas obtenidas exitosamente",
        reservations
    });
}

export const getReservationById: RequestHandler<{ id: string }> = async (req, res): Promise<void> => {
    
    const reservationId = req.params.id;
    const userId = req.userId;

    if (!userId) {
        throw new AppError("Usuario no autenticado", 401);
    }

    const reservation = await reservationServices.getReservationById(reservationId, userId);

    res.status(200).json({
        message: "Reserva obtenida exitosamente",
        reservation
    });
}