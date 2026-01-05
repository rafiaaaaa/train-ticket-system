import { Router } from "express";
import { validate } from "../middlewares/validate";
import { loginSchema, registerSchema } from "../validators/auth.schema";
import { loginUser, registerUser } from "../controllers/auth.controller";

const router = Router();

router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);

export default router;
