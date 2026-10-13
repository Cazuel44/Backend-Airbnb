import { Router } from "express";
import { login, logout } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { loginSchema } from "../schemas/auth.schema.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/login", validate(loginSchema, "body"), login)
router.post("/logout", authMiddleware, logout)

export default router