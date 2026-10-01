
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/app-error.js';


export const errorMiddleware = (
    error: unknown,
    req: Request,
    res: Response,
    next: NextFunction
): void => {

    console.error(error);

    if (error instanceof AppError) {
        res.status(error.statusCode).json({
            message: error.message
        });
        return;
    }

    res.status(500).json({
        message: "Error interno del servidor"
    });
};

