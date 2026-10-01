import {z} from "zod";


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