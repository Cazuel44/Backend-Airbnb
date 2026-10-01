
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import { IUser } from '../types/users.js';
import { CreateUserInput, UpdateUserInput } from '../schemas/user.schema.js';
import { AppError } from '../utils/app-error.js';


const createUser = async (data: CreateUserInput): Promise<IUser> => {

    const existingUser = await User.findOne({ email: data.email });

    if (existingUser) {
        throw new AppError("El usuario ya existe", 409);
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);

    const user = await User.create({
        name: data.name,
        email: data.email,
        password: hashedPassword,
    });

    return user.toObject();
};


const getUsers = async (): Promise<IUser[]> => {

    const users = await User.find();

    return users.map(user => user.toObject());
};


const getUserById = async (userId: string): Promise<IUser> => {

    const user = await User.findById(userId);

    if (!user) {
        throw new AppError("Usuario no encontrado", 404);
    }

    return user.toObject();
};


const updateUser = async (userId: string, data: UpdateUserInput): Promise<IUser> => {

    const user = await User.findById(userId);

    if (!user) {
        throw new AppError("Usuario no encontrado", 404);
    }

    if (data.name !== undefined) {
        user.name = data.name;
    }

    if (data.email !== undefined && data.email !== user.email) {
        const existingUser = await User.findOne({email: data.email});

        if (existingUser) {
            throw new AppError("El correo electrónico ya está en uso", 409);
        }
        user.email = data.email;
    }

    if (data.password !== undefined) {
        user.password = await bcrypt.hash(data.password, 12);
    }

    await user.save();

    return user.toObject();
};


const deleteUser = async (userId: string): Promise<void> => {

    const user = await User.findById(userId);

    if (!user) {
        throw new AppError("Usuario no encontrado", 404);
    }

    await user.deleteOne();
};


export default { createUser, getUsers, getUserById, updateUser, deleteUser };

