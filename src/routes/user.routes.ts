import { Router,} from "express";
import { createUser, getUsers, updateUser, getUserById, deleteUser } from "../controllers/user.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createUserSchema, UpdateUserInput, updateUserSchema, userIdSchema } from "../schemas/user.schema.js";
import type { UserParams } from "../types/users.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", validate(createUserSchema,"body"), createUser);
router.get("/", authMiddleware, getUsers)
router.get("/:id", validate(userIdSchema, "params"), getUserById);
router.put("/:id",validate(userIdSchema, "params"), validate(updateUserSchema,"body"), updateUser);
router.delete("/:id", validate(userIdSchema, "params"), deleteUser);

export default router;