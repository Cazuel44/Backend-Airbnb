import { IProperty } from "../types/property.js";
import Property from "../models/Property.js";
import { CreatePropertyInput, UpdatePropertyInput, } from "../schemas/property.schema.js";
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

const getProperties = async (): Promise<IProperty[]> => {

    const properties = await Property.find();

    return properties.map(property => property.toObject());
}

const getPropertyById = async (propertyId: string): Promise<IProperty> => {

    const property = await Property.findById(propertyId);

    if (!property) {
        throw new AppError("Propiedad no encontrada", 404);
    }

    return property.toObject();
}

const updateProperty = async (propertyId: string, userId: string, data: UpdatePropertyInput): Promise<IProperty> => {

    const property = await Property.findById(propertyId);

    if (!property) {
        throw new AppError("Propiedad no encontrada", 404);
    }

    if (property.owner.toString() !== userId) {
        throw new AppError("No tienes permisos para modificar esta propiedad", 403);
    }

    if (data.title !== undefined) {
        property.title = data.title;
    }

    if (data.description !== undefined) {
        property.description = data.description;
    }

    if (data.price !== undefined) {
        property.price = data.price;
    }

    if (data.location !== undefined) {
        property.location = data.location;
    }

    if (data.images !== undefined) {
        property.images = data.images;
    }

    if (data.guests !== undefined) {
        property.guests = data.guests;
    }

    if (data.bedrooms !== undefined) {
        property.bedrooms = data.bedrooms;
    }

    if (data.bathrooms !== undefined) {
        property.bathrooms = data.bathrooms;
    }

    await property.save();

    return property.toObject();
};

const deleteProperty = async (propertyId: string, userId: string): Promise<void> => {
    const property = await Property.findById(propertyId);

    if (!property) {
        throw new AppError("Propiedad no encontrada", 404);
    }

    if (property.owner.toString() !== userId) {
        throw new AppError("No tienes permisos para eliminar esta propiedad", 403);
    }

    await property.deleteOne();
}

export default { createProperty, getProperties, getPropertyById, updateProperty, deleteProperty }