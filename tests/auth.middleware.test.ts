import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../src/app.js";

describe("Autenticación de usuarios", () => {
    it("debe rechazar una petición sin token", async () => {
        const response = await request(app)
            .get("/api/users");

        expect(response.status).toBe(401);
        expect(response.body.message).toBe(
            "No se proporcionó un token de autenticación"
        );
    });

    it("debe rechazar un encabezado Authorization inválido", async () => {
        const response = await request(app)
            .get("/api/users")
            .set("Authorization", "Basic token-invalido");

        expect(response.status).toBe(401);
        expect(response.body.message).toBe(
            "Token de autenticación inválido"
        );
    });
});