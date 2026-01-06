import { prisma } from "../../lib/prisma";
import { NotFoundError } from "../../shared/errors/NotFoundError";

export const getSeatService = async (scheduleId: string) => {
  const schedule = await prisma.schedule.findUnique({
    where: { id: scheduleId },
    select: {
      trainId: true,
    },
  });

  if (!schedule) {
    throw new NotFoundError("Schedule not found");
  }

  // Ambil seat yang sudah ter-book
  const bookedSeats = await prisma.bookingSeat.findMany({
    where: { scheduleId },
    select: { seatId: true },
  });

  const bookedSeatIds = bookedSeats.map((s) => s.seatId);

  const seats = await prisma.seat.findMany({
    where: { trainId: schedule.trainId },
    orderBy: { number: "asc" },
  });

  return seats.map((seat) => ({
    ...seat,
    isAvailable: !bookedSeatIds.includes(seat.id),
  }));
};
