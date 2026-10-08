import { Types } from "mongoose";
import { IProperty } from "./property.js";

export interface IReservation{
    _id: Types.ObjectId;
    user: Types.ObjectId;
    property: Types.ObjectId;
    checkIn: Date;
    checkOut: Date;
    totalPrice: number;
    status: "pending" | "confirmed" | "cancelled";
    createdAt: Date;
    updatedAt: Date;
}

export interface IReservationWithProperty extends Omit<IReservation, "property"> {
    property: IProperty;
}