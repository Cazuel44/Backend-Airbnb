import { Request, Response, RequestHandler } from 'express';
import authServices from '../services/auth.services.js';
import type { LoginInput } from '../schemas/auth.schema.js';
import { toPublicUser } from '../utils/user.utils.js';
import { AppError } from '../utils/app-error.js';


export const login = async (req: Request, res: Response):Promise<void>=>{
    const userLogin: LoginInput = req.body
    const result = await authServices.loginUser(userLogin);
    const publicUser = toPublicUser(result.user)

    res.status(200).json({
        message: "Usuario autenticado con exito",
        user: publicUser,
        token: result.token
    })
}

export const logout = async (req: Request, res: Response): Promise<void> => {
    const authorization = req.headers.authorization;

    if (!authorization) {
        throw new AppError("No se proporcionó un token de autenticacion", 401);
    }

    const [type, token] = authorization.split(" ");
    if (type !== "Bearer" || !token) {
        throw new AppError("Token de autenticación inválido", 401);
    }

    await authServices.logoutService(token);

    res.status(200).json({
        message: "Sesión cerrada correctamente",
    })

}