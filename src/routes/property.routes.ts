import { Router,} from "express";
import { createProperty } from "../controllers/property.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createPropertySchema } from "../schemas/property.schema.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", authMiddleware, validate(createPropertySchema,"body"), createProperty)

export default router;