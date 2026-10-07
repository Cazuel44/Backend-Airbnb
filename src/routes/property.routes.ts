import { Router,} from "express";
import { createProperty, getProperties, getPropertyById, updateProperty, deleteProperty } from "../controllers/property.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createPropertySchema,propertyIdSchema, updatePropertySchema } from "../schemas/property.schema.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";


const router = Router();

router.post("/", authMiddleware, validate(createPropertySchema,"body"), createProperty)
router.get("/", /* authMiddleware, validate(propertyIdSchema, "params"), */ getProperties)
router.get("/:id", /* authMiddleware, */ validate(propertyIdSchema, "params"), getPropertyById)
router.put("/:id", authMiddleware, validate(propertyIdSchema, "params"), validate(updatePropertySchema, "body"), updateProperty)
router.delete("/:id", authMiddleware, validate(propertyIdSchema, "params"), deleteProperty)

export default router;