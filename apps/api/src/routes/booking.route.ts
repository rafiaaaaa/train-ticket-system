import { Router } from "express";
import { createBookingController } from "../controllers/booking.controller";
import { validate } from "../middlewares/validate";
import { createBookingSchema } from "../validators/booking.schema";

const router = Router();

router.post("/", validate(createBookingSchema), createBookingController);

export default router;
