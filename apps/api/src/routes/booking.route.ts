import { Router } from "express";
import { createBookingController } from "../controllers/booking.controller";
import { validate } from "../middlewares/validate";
import { createBookingSchema } from "../validators/booking.schema";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post(
  "/",
  authMiddleware,
  validate(createBookingSchema),
  createBookingController
);

export default router;
