import { Request, Response } from "express";
import { getSeatService } from "./seat.service";
import { BadRequestError } from "../../shared/errors/BadRequestError";

export const getSeats = async (req: Request, res: Response) => {
  const { scheduleId } = req.params;

  if (typeof scheduleId !== "string") {
    throw new BadRequestError("Schedule ID are required");
  }

  const seats = await getSeatService(scheduleId);

  return res.status(200).json({
    success: true,
    data: seats,
  });
};
