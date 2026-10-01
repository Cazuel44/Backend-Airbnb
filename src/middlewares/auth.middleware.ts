import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/app-error.js';
import jwt from 'jsonwebtoken';
import env from '../config/env.js';
import { AuthPayload } from '../types/auth.js';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const authorization = req.headers.authorization;

    if (!authorization) {
        throw new AppError("No se proporcionó un token de autenticación", 401);
    }

    const [type, token] = authorization.split(" ");

    if (type !== "Bearer" || !token) {
        throw new AppError("Token de autenticación inválido", 401);
    }

    try {
        const decoded = jwt.verify(token, env.JWT_SECRET) as AuthPayload;
        req.userId = decoded.userId;
        /* console.log(decoded); */
        next();
    } catch (error) {
        next(new AppError("Token de autenticación inválido o expirado", 401));
    }
}
