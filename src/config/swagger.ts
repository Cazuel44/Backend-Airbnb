import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Airbnb API",
            version: "1.0.0",
            description: "Documentación de la API de reservas de propiedades",
        },
        servers: [
            /* {
                url: "http://localhost:3000",
                description: "Servidor local",
            }, */
            {
                url: "https://backend-airbnb-u1hl.onrender.com",
                description: "Servidor de producción",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
    },
    apis: ["./src/docs/*.ts",],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;