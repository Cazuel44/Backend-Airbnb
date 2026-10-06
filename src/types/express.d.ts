// Este archivo existe para decirle a TypeScript: "Mi Request de Express puede tener una propiedad adicional llamada userId."

declare global {
    namespace Express {
        interface Request {
            userId?: string;
            rol?: "user" | "admin"; // Agrega la propiedad rol al Request
        }
    }
}

export {};
