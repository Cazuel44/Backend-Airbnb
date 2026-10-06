import bcrypt from "bcrypt";
import { IUser } from "../types/users.js";
import { AppError } from "../utils/app-error.js";
import User from "../models/User.js";
import { LoginInput } from "../schemas/auth.schema.js";
import jwt from "jsonwebtoken";
import { LoginResponse } from "../types/auth.js";
import env from "../config/env.js";
import { toPublicUser } from "../utils/user.utils.js";

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
        env.JWT_SECRET
    );

    return {
        user: user.toObject(),
        token,
        
    };
}

export default {loginUser,}