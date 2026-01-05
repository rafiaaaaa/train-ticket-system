import { Router } from "express";
import { validate } from "../middlewares/validate";
import { loginSchema, registerSchema } from "../validators/auth.schema";
import {
  loginUser,
  logout,
  registerUser,
} from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);
router.post("/logout", authMiddleware, logout);

export default router;
