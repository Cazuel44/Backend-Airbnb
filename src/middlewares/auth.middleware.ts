import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/app-error.js';
import jwt from 'jsonwebtoken';
import env from '../config/env.js';
import { AuthPayload } from '../types/auth.js';
import { authPayloadSchema } from '../schemas/auth.schema.js';
import RevokedToken from '../models/RevokedToken.js';
import { createHash } from 'node:crypto';

export const authMiddleware = async ( req: Request, res: Response, next: NextFunction): Promise<void> => {
    const authorization = req.headers.authorization;

    if (!authorization) {
        next(new AppError("No se proporcionó un token de autenticación", 401));
        return;
    }

    const [type, token, ...extra] = authorization.split(" ");

    if (type !== "Bearer" || !token || extra.length > 0) {
        next(new AppError("Token de autenticación inválido", 401));
        return;
    }

    let decoded: unknown;

    try {
        decoded = jwt.verify(token, env.JWT_SECRET);
    } catch {
        next(new AppError("Token de autenticación inválido o expirado", 401));
        return;
    }

    const result = authPayloadSchema.safeParse(decoded);

    if (!result.success) {
        next(new AppError("Token de autenticación inválido", 401));
        return;
    }

    try {
        const tokenHash = createHash("sha256")
            .update(token)
            .digest("hex");

        const revokedToken = await RevokedToken.findOne({
            tokenHash,
        }).select("_id").lean();

        if (revokedToken) {
            next(new AppError(
                "Token revocado. Inicia sesión nuevamente.",
                401
            ));
            return;
        }

        req.userId = result.data.userId;
        req.rol = result.data.rol;

        next();
    } catch (error: unknown) {
        next(error);
    }
};

/* export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
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

   
} */
