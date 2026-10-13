
import { email, z } from "zod";

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(100),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const authPayloadSchema = z.object({
    userId: z.string().regex(/^[0-9a-fA-F]{24}$/),
    rol: z.enum(["user", "admin"]),
    iat: z.number(),
    exp: z.number(),
});

export type AuthPayloadInput = z.infer<typeof authPayloadSchema>;