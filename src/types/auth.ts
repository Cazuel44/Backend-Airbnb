import type { IUser } from "./users.js";

export interface LoginResponse {
    user: IUser;
    token: string
}

export interface AuthPayload {
    userId: string;
    rol: "user" | "admin";
    iat: number;
}