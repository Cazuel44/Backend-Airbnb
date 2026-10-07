import { Schema, model } from "mongoose";
import { IReservation } from "../types/reservation.js";

const reservationSchema = new Schema<IReservation>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        property: {
            type: Schema.Types.ObjectId,
            ref: "Property",
            required: true,
        },
        checkIn: {
            type: Date,
            required: true,
        },
        checkOut: {
            type: Date,
            required: true,
        },
        totalPrice: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "confirmed", "cancelled"],
            default: "confirmed",
        },
    },
    {
        timestamps: true,
    }

)

export const Reservation = model<IReservation>("Reservation", reservationSchema);

export default Reservation;