import { Request, Response } from "express";
import { createBookingService } from "../services/booking.service";

export async function createBookingController(req: Request, res: Response) {
  const booking = await createBookingService(req.body);

  res.status(201).json({
    success: true,
    data: booking,
  });
}
