import { Router } from "express";
import { getSeats, getTrainSchedules } from "./train.controller";

const router = Router();

router.get("/schedules", getTrainSchedules);
router.get("/schedules/:scheduleId/seats", getSeats);

export default router;
