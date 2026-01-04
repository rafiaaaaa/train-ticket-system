import { Request, Response } from "express";
import { createBookingService } from "../services/booking.service";

export async function createBookingController(req: Request, res: Response) {
  try {
    const booking = await createBookingService({
      userId: req.body.userId,
      scheduleId: req.body.scheduleId,
      seatIds: req.body.seatIds,
    });

    res.status(201).json(booking);
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
}
