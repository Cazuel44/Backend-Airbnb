import { z } from "zod";

export const createReservationSchema = z.object({
    property: z.string().regex(/^[0-9a-fA-F]{24}$/, "El ID de la propiedad no es válido"),
    checkIn: z.coerce.date(),
    checkOut: z.coerce.date(),
    
});

export type CreateReservationInput = z.infer<typeof createReservationSchema>;


export const ReservationIdSchema = z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "El ID de la reserva no es válido"),
});

export type ReservationIdInput = z.infer<typeof ReservationIdSchema>;


export const updateReservationSchema = z.object({
    checkIn: z.coerce.date().optional(),
    checkOut: z.coerce.date().optional(),
}).refine(data => Object.keys(data).length > 0, {
    message: "Al menos una fecha debe ser proporcionada para actualizar la reserva",
});

export type UpdateReservationInput = z.infer<typeof updateReservationSchema>;