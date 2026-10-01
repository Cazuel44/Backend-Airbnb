import express from 'express';
import { errorMiddleware } from './middlewares/error.middleware.js';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js'
import propertyRoutes from './routes/property.routes.js'

const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes)
app.use("/api/properties", propertyRoutes)

app.get('/', (req, res) => {
    res.json({ message: 'Airbnb API funcionando' });
});

app.use(errorMiddleware);



export default app;