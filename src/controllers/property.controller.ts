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