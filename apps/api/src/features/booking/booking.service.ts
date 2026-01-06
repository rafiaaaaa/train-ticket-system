import { prisma } from "../../lib/prisma";

export type bookingPayload = {
  userId: string;
  scheduleId: string;
  seatIds: string[];
};
export async function createBookingService(payload: bookingPayload) {
  const data = await prisma.$transaction(async (tx) => {
    const booking = await tx.booking.create({
      data: {
        userId: payload.userId,
        scheduleId: payload.scheduleId,
        status: "PENDING",
        expiresAt: new Date(Date.now() + 1000 * 60 * 60),
      },
    });

    const bookingSeats = await tx.bookingSeat.createMany({
      data: payload.seatIds.map((id) => ({
        bookingId: booking.id,
        seatId: id,
        scheduleId: payload.scheduleId,
      })),
    });

    return { booking, bookingSeats };
  });

  return data;
}
