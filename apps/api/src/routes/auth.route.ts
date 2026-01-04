import { Router } from "express";
import { validate } from "../middlewares/validate";
import { registerSchema } from "../validators/auth.schema";
import { registerUser } from "../controllers/auth.controller";

const router = Router();

router.post("/register", validate(registerSchema), registerUser);

export default router;
