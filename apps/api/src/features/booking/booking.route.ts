import { Router } from "express";
import { createBookingController } from "./booking.controller";
import { validate } from "../../middlewares/validate";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { createBookingSchema } from "@repo/shared";

const router = Router();

router.post(
  "/",
  authMiddleware,
  validate(createBookingSchema),
  createBookingController,
);

export default router;
