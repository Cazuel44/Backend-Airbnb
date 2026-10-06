
import { Request, Response, RequestHandler } from 'express';
import userServices from '../services/user.services.js';
import { CreateUserInput, UpdateUserInput } from '../schemas/user.schema.js';
import { UserParams } from '../types/users.js';
import { toPublicUser } from '../utils/user.utils.js';


export const createUser = async (req: Request, res: Response): Promise<void> => {

    const userData: CreateUserInput = req.body;

    const user = await userServices.createUser(userData);

    const publicUser = toPublicUser(user);

    res.status(201).json({
        message: "Usuario creado exitosamente",
        user: publicUser
    });
};


export const getUsers = async (req: Request, res: Response): Promise<void> => {

    /* const userId = req.userId; */ // sirve para obtener el id del usuario autenticado

    const users = await userServices.getUsers();

    const publicUsers = users.map(toPublicUser);

    res.status(200).json({
        message: "Usuarios obtenidos exitosamente",
        users: publicUsers,
        /* userId */
    });
};


export const getUserById: RequestHandler<UserParams> = async (req, res): Promise<void> => {

    const userId = req.params.id;

    const user = await userServices.getUserById(userId);

    const publicUser = toPublicUser(user);

    res.status(200).json({
        message: "Usuario obtenido exitosamente",
        user: publicUser
    });
};


export const updateUser: RequestHandler<UserParams> = async (req, res): Promise<void> => {

    const userId = req.params.id;

    const userData: UpdateUserInput = req.body;

    const user = await userServices.updateUser(userId, userData);

    const publicUser = toPublicUser(user);

    res.status(200).json({
        message: "Usuario actualizado exitosamente",
        user: publicUser
    });
};


export const deleteUser: RequestHandler<UserParams> = async (req, res): Promise<void> => {

    const userId = req.params.id;

    await userServices.deleteUser(userId);

    res.status(200).json({
        message: "Usuario eliminado exitosamente"
    });
};

// !modificar permisos de usuario por ejemplo un admin que este autorizado para modificar usuarios eliminarlos etc