import { email, z } from "zod";

export const createUserSchema = z.object({
    name: z.string().min(2).max(100),
    email: z.string().email(),
    password: z.string().min(8).max(100),
    rol: z.enum(["user", "admin"]).default("user"),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;


export const userIdSchema = z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "El ID del usuario no es válido"),
})

export type UserIdInput = z.infer<typeof userIdSchema>;


export const updateUserSchema = z.object({
    name: z.string().min(2).max(100).optional(),
    email: z.string().email().optional(),
    password: z.string().min(8).max(100).optional(),
})

export type UpdateUserInput = z.infer<typeof updateUserSchema>;