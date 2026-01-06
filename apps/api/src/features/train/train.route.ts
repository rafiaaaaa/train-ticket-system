import { Router } from "express";
import { getSeats } from "./seat.controller";

const router = Router();

router.get("/schedules/:scheduleId/seats", getSeats);

export default router;
