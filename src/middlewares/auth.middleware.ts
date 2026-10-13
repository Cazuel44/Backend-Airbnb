import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/app-error.js';
import jwt from 'jsonwebtoken';
import env from '../config/env.js';
import { AuthPayload } from '../types/auth.js';
import { authPayloadSchema } from '../schemas/auth.schema.js';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const authorization = req.headers.authorization;

    if (!authorization) {
        next(new AppError("No se proporcionó un token de autenticación", 401));
        return;
    }

    const [type, token] = authorization.split(" ");

    if (type !== "Bearer" || !token) {
        next(new AppError("Token de autenticación inválido", 401));
        return;
    }

    try {
        const decoded: unknown = jwt.verify(token, env.JWT_SECRET);
        const result = authPayloadSchema.safeParse(decoded);

        if (!result.success) {
            next(new AppError("Token de autenticación inválido", 401));
            return;
        }

        req.userId = result.data.userId;
        req.rol = result.data.rol;

        next();
    } catch {
        next(new AppError("Token de autenticación inválido o expirado", 401));
    }

    /* if (!authorization) {
        throw new AppError("No se proporcionó un token de autenticación", 401);
    }

    const [type, token] = authorization.split(" ");

    if (type !== "Bearer" || !token) {
        throw new AppError("Token de autenticación inválido", 401);
    }

    try {
        const decoded = jwt.verify(token, env.JWT_SECRET) as AuthPayload;
        req.userId = decoded.userId;
        req.rol = decoded.rol;
        console.log(decoded);
        next();
    } catch (error) {
        next(new AppError("Token de autenticación inválido o expirado", 401));
    } */
}
