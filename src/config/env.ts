import dotenv from "dotenv";

dotenv.config();

const MONGODB_URL =
    process.env.NODE_ENV === "test"
        ? process.env.MONGODB_TEST_URL
        : process.env.MONGODB_URL;


if (!MONGODB_URL) {
    throw new Error("MongoDb no esta configurado")
}

const PORT = Number(process.env.PORT ?? 3000);

if (!Number.isInteger(PORT) || PORT < 1 || PORT > 65535) {
    throw new Error("PORT debe ser un puerto válido");
}

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET || JWT_SECRET.length < 32) {
    throw new Error("JWT_SECRET debe tener al menos 32 caracteres");
}

export default {
    JWT_SECRET,
    MONGODB_URL,
    PORT
};

