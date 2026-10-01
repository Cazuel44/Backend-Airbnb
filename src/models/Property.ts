import { Schema, model } from "mongoose";
import { IProperty } from "../types/property.js";

const propertySchema = new Schema<IProperty>(

    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        images: {
            type: [String],
            required: true,
        },
        guests: {
            type: Number,
            required: true,
        },
        bedrooms: {
            type: Number,
            required: true,
        },
        bathrooms: {
            type: Number,
            required: true,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    },

)

const Property = model<IProperty>("Property", propertySchema);

export default Property;

/* 
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
    updatedAt: Date; */