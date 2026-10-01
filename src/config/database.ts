import env from "./env.js";
import mongoose from "mongoose";


const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(env.MONGODB_URL);

        console.log("MongoDB conectado");
    } catch (error) {
        console.error("Error al conectar con MongoDB:", error);
        process.exit(1);
    }
};

export default connectDB;