import {Types} from "mongoose";

export interface IUser{
    _id: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    rol: "user" | "admin";
}

export interface UserParams {
    [key: string]: string;
    id: string;
}