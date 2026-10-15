import { beforeAll, afterAll } from "vitest";
import mongoose from "mongoose";
import connectDB from "../src/config/database.js";

beforeAll(async () => {
    await connectDB();
});

afterAll(async () => {
    await mongoose.disconnect();
});