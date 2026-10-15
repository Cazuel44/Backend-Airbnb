import { describe, it, expect, afterEach } from "vitest";
import request from "supertest";
import bcrypt from "bcrypt";
import { createHash, randomUUID } from "node:crypto";
import app from "../src/app.js";
import User from "../src/models/User.js";
import RevokedToken from "../src/models/RevokedToken.js";

describe("Integración de autenticación", () => {
    let testEmail: string;
    let tokenHash: string | undefined;

    afterEach(async () => {
        if (testEmail) {
            await User.deleteOne({ email: testEmail });
        }

        if (tokenHash) {
            await RevokedToken.deleteOne({ tokenHash });
        }

        tokenHash = undefined;
    });

    it("debe permitir el login, cerrar sesión y rechazar el token revocado", async () => {
        testEmail = `test-${randomUUID()}@test.com`;

        const password = "Password123!";
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name: "Usuario de prueba",
            email: testEmail,
            password: hashedPassword,
            rol: "user",
        });

        // 1. Iniciar sesión
        const loginResponse = await request(app)
            .post("/api/auth/login")
            .send({
                email: testEmail,
                password,
            });
        console.log("Login status:", loginResponse.status);
        console.log("Login body:", loginResponse.body);
        expect(loginResponse.status).toBe(200);
        expect(loginResponse.body.token).toBeTypeOf("string");


        const token: string = loginResponse.body.token;

        tokenHash = createHash("sha256")
            .update(token)
            .digest("hex");

        // 2. Acceder a una ruta protegida
        const protectedResponse = await request(app)
            .get("/api/users")
            .set("Authorization", `Bearer ${token} `);

        expect(protectedResponse.status).toBe(200);

        // 3. Cerrar sesión
        const logoutResponse = await request(app)
            .post("/api/auth/logout")
            .set("Authorization", `Bearer ${token} `);

        expect(logoutResponse.status).toBe(200);

        // 4. El mismo token debe dejar de funcionar
        const revokedResponse = await request(app)
            .get("/api/users")
            .set("Authorization", `Bearer ${token} `);

        expect(revokedResponse.status).toBe(401);
        expect(revokedResponse.body.message).toBe(
            "Token revocado. Inicia sesión nuevamente."
        );
    });
});
