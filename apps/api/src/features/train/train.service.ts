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

export const getTrainSchedulesService = async (params: {
  originCode?: string;
  destinationCode?: string;
  startDate?: Date;
  endDate?: Date;
}) => {
  const { originCode, destinationCode, startDate, endDate } = params;

  const schedules = await prisma.schedule.findMany({
    where: {
      route: {
        originStation: { code: originCode },
        destinationStation: { code: destinationCode },
      },
      departureTime: {
        gte: startDate,
        lt: endDate,
      },
    },
    include: {
      train: true,
      route: {
        include: {
          originStation: true,
          destinationStation: true,
        },
      },
      _count: {
        select: {
          bookingSeats: true,
        },
      },
    },
  });

  return schedules;
};
