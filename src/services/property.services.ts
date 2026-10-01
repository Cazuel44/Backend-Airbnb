import { IProperty } from "../types/property.js";
import Property from "../models/Property.js";
import { CreatePropertyInput, } from "../schemas/property.schema.js";
import { AppError } from '../utils/app-error.js';

const createProperty = async (data: CreatePropertyInput, userId: string): Promise<IProperty> => {

    const existingProperty = await Property.findOne({ title: data.title });

    if (existingProperty) {
        throw new AppError("La propiedad ya existe", 409);
    }

    const property = await Property.create({
        title: data.title,
        description: data.description,
        price: data.price,
        location: data.location,
        images: data.images,
        guests: data.guests,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        owner: userId
    });

    return property.toObject();
}

export default { createProperty, }