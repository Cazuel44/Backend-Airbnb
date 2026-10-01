import dotenv from "dotenv";

dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL

if (!MONGODB_URL) {
    throw new Error("MongoDb no esta configurado")
}

const PORT = process.env.PORT

if (!PORT) {
    throw new  Error("El puerto no esá configurado")
}

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET no está configurado");
}

export default {
    JWT_SECRET,
    MONGODB_URL,
    PORT
};

