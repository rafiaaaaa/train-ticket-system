import { z } from "zod";

export const createBookingSchema = z.object({
  userId: z.uuid(),
  scheduleId: z.uuid(),
  seatIds: z.array(z.uuid()).min(1),
});
