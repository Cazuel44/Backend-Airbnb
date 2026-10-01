import { Types } from "mongoose";

export interface IProperty {
    _id: Types.ObjectId;
    title: string;
    description: string;
    price: number;
    location: string;
    images: string[];
    guests: number;
    bedrooms: number;
    bathrooms: number;
    owner: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}