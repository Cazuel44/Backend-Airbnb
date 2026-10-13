import bcrypt from "bcrypt";
import { IUser } from "../types/users.js";
import { AppError } from "../utils/app-error.js";
import User from "../models/User.js";
import type { LoginInput } from "../schemas/auth.schema.js";
import jwt from "jsonwebtoken";
import type { LoginResponse } from "../types/auth.js";
import env from "../config/env.js";
import { toPublicUser } from "../utils/user.utils.js";
import RevokedToken from "../models/RevokedToken.js";

const loginUser = async (data: LoginInput): Promise<LoginResponse> => {
    const user = await User.findOne({ email: data.email });

    if (!user) {
        throw new AppError("Credenciales invalidas", 401)

    }

    const passwordMatch = await bcrypt.compare(data.password, user.password)

    if (!passwordMatch) {
        throw new AppError("Credenciales invalidas", 401)
    }

    const token = jwt.sign(
        { userId: user._id, rol: user.rol },
        env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    return {
        user: user.toObject(),
        token,
        
    };
}

const logoutService = async (token: string): Promise<void> => {
    const expireToken = jwt.verify(token, env.JWT_SECRET);

    if (typeof expireToken === "string" || !expireToken.exp) {
        throw new AppError("Tokeb de autenticacion inválido", 401);
    }

    await RevokedToken.create({
        token,
        expiresAt: new Date(expireToken.exp * 1000)
    })
};

export default {loginUser, logoutService,}