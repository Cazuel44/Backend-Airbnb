import type { IUser } from "../types/users.js"

export type PublicUser = Omit<IUser, "password">;

export const toPublicUser = (user: IUser): PublicUser=>{

    const {password, ...toPublicUser} = user;

    return toPublicUser
};