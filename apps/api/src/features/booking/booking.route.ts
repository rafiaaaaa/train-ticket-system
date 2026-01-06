import { Router } from "express";
import { createBookingController } from "./booking.controller";
import { validate } from "../../middlewares/validate";
import { createBookingSchema } from "./booking.schema";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.post(
  "/",
  authMiddleware,
  validate(createBookingSchema),
  createBookingController
);

export default router;
