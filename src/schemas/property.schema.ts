import { z } from "zod";


export const createPropertySchema = z.object({
    title: z.string().min(2).max(100),
    description: z.string().min(10).max(1000),
    price: z.number().min(0),
    location: z.string().min(2).max(100),
    images: z.array(z.string().url()).min(1).max(5),
    guests: z.number().min(1).max(20),
    bedrooms: z.number().min(1).max(10),
    bathrooms: z.number().min(1).max(10),

});

export type CreatePropertyInput = z.infer<typeof createPropertySchema>;

export const propertyIdSchema = z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "El ID de la propiedad no es válido"),
});

export type PropertyIdInput = z.infer<typeof propertyIdSchema>;

export const updatePropertySchema = z.object({
    title: z.string().min(2).max(100).optional(),
    description: z.string().min(10).max(1000).optional(),
    price: z.number().min(0).optional(),
    location: z.string().min(2).max(100).optional(),
    images: z.array(z.string().url()).min(1).max(5).optional(),
    guests: z.number().min(1).max(20).optional(),
    bedrooms: z.number().min(1).max(10).optional(),
    bathrooms: z.number().min(1).max(10).optional(),
}).refine(data => Object.keys(data).length > 0, {
    message: "Al menos un campo debe ser proporcionado para actualizar la propiedad",
});

export type UpdatePropertyInput = z.infer<typeof updatePropertySchema>;

