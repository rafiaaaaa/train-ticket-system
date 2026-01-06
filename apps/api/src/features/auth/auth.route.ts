import { Router } from "express";
import { validate } from "../middlewares/validate";
import { loginSchema, registerSchema } from "../validators/auth.schema";
import {
  loginUser,
  logout,
  me,
  refresh,
  registerUser,
} from "../features/auth/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);
router.get("/me", authMiddleware, me);
router.get("/refresh", refresh);
router.post("/logout", logout);

export default router;
