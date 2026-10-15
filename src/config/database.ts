import env from "./env.js";
import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
    await mongoose.connect(env.MONGODB_URL);
    console.log("MongoDB conectado");
};


export default connectDB;