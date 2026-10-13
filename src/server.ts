import connectDB from './config/database.js';
import env from './config/env.js';
import app from './app.js';


const PORT = env.PORT || 3000;

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Servidor ejecutandose en http://localhost:${PORT}`);
    });
};

startServer().catch((error: unknown) => {
    console.error("Error al iniciar el servidor:", error);
    process.exit(1);
});

/* startServer(); */


