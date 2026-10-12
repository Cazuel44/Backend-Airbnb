import { Router,} from "express";
import { validate } from "../middlewares/validate.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createReservationSchema, ReservationIdSchema, updateReservationSchema } from "../schemas/reservation.schema.js";
import { createReservation, getReservationsByUser, getReservationById, updateReservation, cancelReservation } from "../controllers/reservation.controller.js";

const router = Router();

router.post("/", authMiddleware, validate(createReservationSchema, "body"), createReservation);
router.get("/", authMiddleware, getReservationsByUser);
router.get("/:id", validate(ReservationIdSchema, "params"), authMiddleware, getReservationById);
router.put("/:id", validate(ReservationIdSchema, "params"), authMiddleware, validate(updateReservationSchema, "body"), updateReservation);
router.patch("/:id/cancel", validate(ReservationIdSchema, "params"), authMiddleware, /* validate(updateReservationSchema, "body"), */ cancelReservation);

export default router;  