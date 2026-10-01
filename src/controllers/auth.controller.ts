import { Request, Response, RequestHandler } from 'express';
import authServices from '../services/auth.services.js';
import { LoginInput } from '../schemas/auth.schema.js';
import { toPublicUser } from '../utils/user.utils.js';


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