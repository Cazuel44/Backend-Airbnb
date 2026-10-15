import { Schema, model } from "mongoose";
import type { IRevokedToken } from "../types/auth.js";


const revokedTokenSchema = new Schema<IRevokedToken>({
    tokenHash:{
        type: String,
        required: true,
        unique: true,
    },
    expiresAt: {
        type: Date,
        required: true,
        expires: 0, // esto hace que el documento se elimine automáticamente después de la fecha de expiración configurada al crear el token 
    }
})

const RevokedToken = model<IRevokedToken>("RevokedToken", revokedTokenSchema);

export default RevokedToken;