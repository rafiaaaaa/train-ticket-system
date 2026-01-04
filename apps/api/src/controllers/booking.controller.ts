import { Request, Response } from "express";
import { createBookingService } from "../services/booking.service";

export async function createBookingController(req: Request, res: Response) {
  const booking = await createBookingService({
    userId: req.body.userId,
    scheduleId: req.body.scheduleId,
    seatIds: req.body.seatIds,
  });

  res.status(201).json({
    success: true,
    data: booking,
  });
}
