import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/app-error.js";

export const adminMiddleware = (req: Request, res: Response, next: NextFunction): void => {

    if (req.rol !== "admin") {
        throw new AppError("No tienes permisos para realizar esta acción", 403);
    }

    next();
};