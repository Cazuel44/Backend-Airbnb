
import { afterEach, describe, expect, it } from "vitest";
import request from "supertest";
import bcrypt from "bcrypt";
import { randomUUID } from "node:crypto";
import mongoose from "mongoose";

import app from "../src/app.js";
import User from "../src/models/User.js";
import Property from "../src/models/Property.js";
import Reservation from "../src/models/Reservation.js";

describe("Integración de cancelación de reservas", () => {
    const emails: string[] = [];
    let propertyId: mongoose.Types.ObjectId | undefined;
    let reservationId: mongoose.Types.ObjectId | undefined;

    afterEach(async () => {
        if (reservationId) {
            await Reservation.deleteOne({ _id: reservationId });
            reservationId = undefined;
        }

        if (propertyId) {
            await Property.deleteOne({ _id: propertyId });
            propertyId = undefined;
        }

        if (emails.length > 0) {
            await User.deleteMany({ email: { $in: emails } });
            emails.length = 0;
        }
    });

    it("debe impedir que un usuario cancele la reserva de otro", async () => {
        const uniqueId = randomUUID();
        const ownerEmail = `owner-${uniqueId}@test.com`;
        const otherEmail = `other-${uniqueId}@test.com`;
        emails.push(ownerEmail, otherEmail);

        const hashedPassword = await bcrypt.hash("Password123!", 10);

        const owner = await User.create({
            name: "Propietario de reserva",
            email: ownerEmail,
            password: hashedPassword,
            rol: "user",
        });

        const otherUser = await User.create({
            name: "Otro usuario",
            email: otherEmail,
            password: hashedPassword,
            rol: "user",
        });

        const property = await Property.create({
            title: "Propiedad de prueba",
            description: "Propiedad para test de integración",
            price: 50000,
            location: "Santiago",
            images: [],
            guests: 2,
            bedrooms: 1,
            bathrooms: 1,
            owner: owner._id,
        });
        propertyId = property._id;

        const reservation = await Reservation.create({
            user: owner._id,
            property: property._id,
            checkIn: new Date("2030-01-10T00:00:00.000Z"),
            checkOut: new Date("2030-01-12T00:00:00.000Z"),
            totalPrice: 100000,
            status: "confirmed",
        });
        reservationId = reservation._id;

        const loginResponse = await request(app)
            .post("/api/auth/login")
            .send({
                email: otherEmail,
                password: "Password123!",
            });

        expect(loginResponse.status).toBe(200);

        const token: string = loginResponse.body.token;

        const cancelResponse = await request(app)
            .patch(`/api/reservations/${reservationId.toString()}/cancel`)
            .set("Authorization", `Bearer ${token}`);

        expect(cancelResponse.status).toBe(403);
        expect(cancelResponse.body.message).toBe(
            "No tienes permisos para cancelar esta reserva"
        );

        const reservationAfterAttempt = await Reservation.findById(reservationId);

        expect(reservationAfterAttempt).not.toBeNull();
        expect(reservationAfterAttempt?.status).toBe("confirmed");

        expect(otherUser._id.toString()).not.toBe(owner._id.toString());
    });


    it("debe cancelar su propia reserva y cambiar el estado a cancelled", async () => {
        const uniqueId = randomUUID();
        const ownerEmail = `owner-${uniqueId}@test.com`;
        emails.push(ownerEmail);

        const password = "Password123!";
        const hashedPassword = await bcrypt.hash(password, 10);

        const owner = await User.create({
            name: "Propietario de reserva",
            email: ownerEmail,
            password: hashedPassword,
            rol: "user",
        });

        const property = await Property.create({
            title: "Propiedad de prueba",
            description: "Propiedad para test de integración",
            price: 50000,
            location: "Santiago",
            images: [],
            guests: 2,
            bedrooms: 1,
            bathrooms: 1,
            owner: owner._id,
        });
        propertyId = property._id;

        const reservation = await Reservation.create({
            user: owner._id,
            property: property._id,
            checkIn: new Date("2030-01-10T00:00:00.000Z"),
            checkOut: new Date("2030-01-12T00:00:00.000Z"),
            totalPrice: 100000,
            status: "confirmed",
        });
        reservationId = reservation._id;

        // 1. El propietario inicia sesión
        const loginResponse = await request(app)
            .post("/api/auth/login")
            .send({
                email: ownerEmail,
                password,
            });

        expect(loginResponse.status).toBe(200);

        const token: string = loginResponse.body.token;

        // 2. Cancela su propia reserva
        const cancelResponse = await request(app)
            .patch(`/api/reservations/${reservationId.toString()}/cancel`)
            .set("Authorization", `Bearer ${token}`);

        expect(cancelResponse.status).toBe(200);
        expect(cancelResponse.body.reservation.status).toBe("cancelled");

        // 3. Verifica que el cambio quedó guardado en MongoDB
        const reservationAfterCancellation =
            await Reservation.findById(reservationId);

        expect(reservationAfterCancellation).not.toBeNull();
        expect(reservationAfterCancellation?.status).toBe("cancelled");
    });

    it("intenta cancelar la reserva que ya esta cancelada", async () => {
        const uniqueId = randomUUID();
        const ownerEmail = `owner-${uniqueId}@test.com`;
        emails.push(ownerEmail);

        const password = "Password123!";
        const hashedPassword = await bcrypt.hash(password, 10);

        const owner = await User.create({
            name: "Propietario de reserva",
            email: ownerEmail,
            password: hashedPassword,
            rol: "user",
        });

        const property = await Property.create({
            title: "Propiedad de prueba",
            description: "Propiedad para test de integración",
            price: 50000,
            location: "Santiago",
            images: [],
            guests: 2,
            bedrooms: 1,
            bathrooms: 1,
            owner: owner._id,
        });
        propertyId = property._id;

        const reservation = await Reservation.create({
            user: owner._id,
            property: property._id,
            checkIn: new Date("2030-01-10T00:00:00.000Z"),
            checkOut: new Date("2030-01-12T00:00:00.000Z"),
            totalPrice: 100000,
            status: "confirmed",
        });
        reservationId = reservation._id;

        // 1. El propietario inicia sesión
        const loginResponse = await request(app)
            .post("/api/auth/login")
            .send({
                email: ownerEmail,
                password,
            });

        expect(loginResponse.status).toBe(200);

        const token: string = loginResponse.body.token;

        // 2. Cancela su propia reserva
        const cancelResponse = await request(app)
            .patch(`/api/reservations/${reservationId.toString()}/cancel`)
            .set("Authorization", `Bearer ${token}`);

        expect(cancelResponse.status).toBe(200);
        expect(cancelResponse.body.reservation.status).toBe("cancelled");

        // intenta cancelar la reserva que esta cancelada
        const cancelResponse2 = await request(app)
            .patch(`/api/reservations/${reservationId.toString()}/cancel`)
            .set("Authorization", `Bearer ${token}`);

        expect(cancelResponse2.status).toBe(400);
        expect(cancelResponse2.body.message).toBe("La reserva ya está cancelada");


        // 3. Verifica que el cambio quedó guardado en MongoDB
        const reservationAfterCancellation =
            await Reservation.findById(reservationId);

        expect(reservationAfterCancellation).not.toBeNull();
        expect(reservationAfterCancellation?.status).toBe("cancelled");
    });

});


describe("Integración de actualización de reservas", () => {
    const emails: string[] = [];
    let propertyId: mongoose.Types.ObjectId | undefined;
    let reservationId: mongoose.Types.ObjectId | undefined;

    afterEach(async () => {
        if (reservationId) {
            await Reservation.deleteOne({ _id: reservationId });
            reservationId = undefined;
        }

        if (propertyId) {
            await Property.deleteOne({ _id: propertyId });
            propertyId = undefined;
        }

        if (emails.length > 0) {
            await User.deleteMany({ email: { $in: emails } });
            emails.length = 0;
        }
    });

    it("debe actualizar las fechas y recalcular el precio de la reserva", async () => {
        const uniqueId = randomUUID();
        const ownerEmail = `owner-${uniqueId}@test.com`;
        const password = "Password123!";

        emails.push(ownerEmail);

        const hashedPassword = await bcrypt.hash(password, 10);

        const owner = await User.create({
            name: "Usuario de prueba",
            email: ownerEmail,
            password: hashedPassword,
            rol: "user",
        });

        const property = await Property.create({
            title: "Propiedad de prueba",
            description: "Propiedad para test de integración",
            price: 50000,
            location: "Santiago",
            images: [],
            guests: 2,
            bedrooms: 1,
            bathrooms: 1,
            owner: owner._id,
        });

        propertyId = property._id;

        const reservation = await Reservation.create({
            user: owner._id,
            property: property._id,
            checkIn: new Date("2030-01-10T00:00:00.000Z"),
            checkOut: new Date("2030-01-12T00:00:00.000Z"),
            totalPrice: 100000,
            status: "confirmed",
        });

        reservationId = reservation._id;

        const loginResponse = await request(app)
            .post("/api/auth/login")
            .send({
                email: ownerEmail,
                password,
            });

        expect(loginResponse.status).toBe(200);

        const token: string = loginResponse.body.token;

        const updateResponse = await request(app)
            .put(`/api/reservations/${reservationId.toString()}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                checkIn: "2030-01-10T00:00:00.000Z",
                checkOut: "2030-01-13T00:00:00.000Z",
            });

        expect(updateResponse.status).toBe(200);

        expect(updateResponse.body.message).toBe(
            "Reserva actualizada exitosamente"
        );
        expect(updateResponse.body.reservation.checkIn).toBe(
            "2030-01-10T00:00:00.000Z"
        );
        expect(updateResponse.body.reservation.checkOut).toBe(
            "2030-01-13T00:00:00.000Z"
        );
        expect(updateResponse.body.reservation.totalPrice).toBe(150000);

        const reservationAfterUpdate = await Reservation.findById(reservationId);
        expect(reservationAfterUpdate).not.toBeNull();
        expect(reservationAfterUpdate?.checkIn.toISOString()).toBe(
            "2030-01-10T00:00:00.000Z"
        );
        expect(reservationAfterUpdate?.checkOut.toISOString()).toBe(
            "2030-01-13T00:00:00.000Z"
        );
        expect(reservationAfterUpdate?.totalPrice).toBe(150000);
    });

    it("intenta modificar la reserva de otro usuario", async () => {
        const uniqueId = randomUUID();
        const ownerEmail = `owner-${uniqueId}@test.com`;
        const otherEmail = `other-${uniqueId}@test.com`;
        emails.push(ownerEmail, otherEmail);

        const hashedPassword = await bcrypt.hash("Password123!", 10);
        const owner = await User.create({
            name: "Propietario de reserva",
            email: ownerEmail,
            password: hashedPassword,
            rol: "user",
        });

        const otherUser = await User.create({
            name: "Otro usuario",
            email: otherEmail,
            password: hashedPassword,
            rol: "user",
        });

        const property = await Property.create({
            title: "Propiedad de prueba",
            description: "Propiedad para test de integración",
            price: 50000,
            location: "Santiago",
            images: [],
            guests: 2,
            bedrooms: 1,
            bathrooms: 1,
            owner: owner._id,
        });
        propertyId = property._id;

        const reservation = await Reservation.create({
            user: owner._id,
            property: property._id,
            checkIn: new Date("2030-01-10T00:00:00.000Z"),
            checkOut: new Date("2030-01-12T00:00:00.000Z"),
            totalPrice: 100000,
            status: "confirmed",
        });
        reservationId = reservation._id;

        const loginResponse = await request(app)
            .post("/api/auth/login")
            .send({
                email: otherEmail,
                password: "Password123!",
            });

        expect(loginResponse.status).toBe(200);

        const token: string = loginResponse.body.token;

        const updateResponse = await request(app)
            .put(`/api/reservations/${reservationId.toString()}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                checkIn: "2030-01-10T00:00:00.000Z",
                checkOut: "2030-01-15T00:00:00.000Z",
            });

        expect(updateResponse.status).toBe(403);
        expect(updateResponse.body.message).toBe(
            "No tienes permisos para actualizar esta reserva"
        );
    });



});

