import type { IUser } from "./users.js";

export interface LoginResponse {
    user: IUser;
    token: string
}

export interface AuthPayload {
    userId: string;
    iat: number;
}