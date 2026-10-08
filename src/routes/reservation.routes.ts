import { Router,} from "express";
import { validate } from "../middlewares/validate.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createReservationSchema, ReservationIdSchema } from "../schemas/reservation.schema.js";
import { createReservation, getReservationsByUser, getReservationById } from "../controllers/reservation.controller.js";

const router = Router();

router.post("/", authMiddleware, validate(createReservationSchema, "body"), createReservation);
router.get("/", authMiddleware, getReservationsByUser);
router.get("/:id", validate(ReservationIdSchema, "params"), authMiddleware, getReservationById);

export default router;  