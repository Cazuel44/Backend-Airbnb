import { Request, Response, NextFunction, RequestHandler } from "express";
import { ZodType } from "zod";

type RouteParams = Record<string, string>;
type RequestSource = "body" | "params";

export const validate = <T, P extends RouteParams = RouteParams>(schema: ZodType<T>, source: RequestSource): RequestHandler<P> => {
    return (req, res, next): void => {
        const data = source === "body" ? req.body : req.params;
        const result = schema.safeParse(data);

        if (!result.success) {
            res.status(400).json({
                message: "Datos inválidos",
                errors: result.error.issues,
            });
            return;
        }

        if (source === "body") {
            req.body = result.data;
        } 

        next();
    };
};