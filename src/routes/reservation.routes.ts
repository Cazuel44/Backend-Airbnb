import { Router,} from "express";
import { validate } from "../middlewares/validate.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createReservationSchema } from "../schemas/reservation.schema.js";
import { createReservation } from "../controllers/reservation.controller.js";

const router = Router();

router.post("/", authMiddleware, validate(createReservationSchema, "body"), createReservation);

export default router;