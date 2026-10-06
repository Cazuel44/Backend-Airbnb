import { Request, Response, RequestHandler } from 'express';
import propertyServices from '../services/property.services.js';
import { CreatePropertyInput, } from '../schemas/property.schema.js';
import { AppError } from '../utils/app-error.js';


export const createProperty = async (req: Request, res: Response): Promise<void> => {

    const propertyData: CreatePropertyInput = req.body;
    const userId = req.userId;

    if (!userId) {
        throw new AppError("Usuario no autenticado", 401);
    }

    const property = await propertyServices.createProperty(propertyData, userId);

    res.status(201).json({
        message: "Propiedad creada exitosamente",
        property
    });
}

export const getProperties = async (req: Request, res: Response): Promise<void> => {

    const properties = await propertyServices.getProperties();

    res.status(200).json({
        message: "Propiedades obtenidas exitosamente",
        properties
    })
}

export const getPropertyById: RequestHandler<{ id: string }> = async (req, res): Promise<void> => {

    const propertyId = req.params.id;

    const property = await propertyServices.getPropertyById(propertyId);

    res.status(200).json({
        message: "Propiedad obtenida exitosamente",
        property
    });
}

export const updateProperty: RequestHandler<{ id: string }> = async (req, res): Promise<void> => {
    const propertyId = req.params.id;
    const userId = req.userId;
    const propertyData = req.body;

    if (!userId) {
        throw new AppError("Usuario no autenticado", 401);
    }

    const updatedProperty = await propertyServices.updateProperty(propertyId, userId, propertyData);

    res.status(200).json({
        message: "Propiedad actualizada exitosamente",
        property: updatedProperty
    });
}

// !modificar permisos de usuario por ejemplo un owner puede modificar sus propiedades o eliminarlas etc