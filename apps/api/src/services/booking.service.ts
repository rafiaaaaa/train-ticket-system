import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";

export async function createBookingWithLock({
  userId,
  scheduleId,
  seatIds,
}: {
  userId: string;
  scheduleId: string;
  seatIds: string[];
}) {
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 10 * 60 * 1000);
  return prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    const lockedSeats = await tx.bookingSeat.findMany({
      where: {
        seat: { id: { in: seatIds } },
        booking: {
          scheduleId,
          status: { in: ["PENDING", "CONFIRMED"] },
          expiresAt: { gt: now },
        },
      },
    });
    console.log("Locked seats:", lockedSeats);
    if (lockedSeats.length > 0) {
      throw new Error("Seat already booked");
    }

    const booking = await tx.booking.create({
      data: {
        userId,
        scheduleId,
        status: "PENDING",
        expiresAt,
      },
    });

    await tx.bookingSeat.createMany({
      data: seatIds.map((seatId) => ({
        bookingId: booking.id,
        seatId,
      })),
    });

    return booking;
  });
}

export async function createBookingService(input: {
  userId: string;
  scheduleId: string;
  seatIds: string[];
}) {
  return {
    message: "Booking service connected",
    input,
  };
}
