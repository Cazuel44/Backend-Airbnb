import { z } from "zod";

export const createReservationSchema = z.object({
    property: z.string().regex(/^[0-9a-fA-F]{24}$/, "El ID de la propiedad no es válido"),
    checkIn: z.coerce.date(),
    checkOut: z.coerce.date(),
    
});

export type CreateReservationInput = z.infer<typeof createReservationSchema>;