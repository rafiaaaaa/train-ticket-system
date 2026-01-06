import { Request, Response } from "express";
import { createBookingService } from "../services/booking.service";

export async function createBookingController(req: Request, res: Response) {
  const userId = req.user?.userId;
  const payload = { ...req.body, userId };

  const booking = await createBookingService(payload);

  res.status(201).json({
    success: true,
    data: booking,
  });
}
