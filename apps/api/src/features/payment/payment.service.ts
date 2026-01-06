import { prisma } from "../../lib/prisma";
import { BadRequestError } from "../../shared/errors/BadRequestError";
import { ConflictError } from "../../shared/errors/ConflictError";
import { NotFoundError } from "../../shared/errors/NotFoundError";

export async function payBooking({
  bookingId,
  userId,
  amount,
}: {
  bookingId: string;
  userId: string;
  amount: number;
}) {
  return prisma.$transaction(async (tx) => {
    const booking = await tx.booking.findUnique({
      where: { id: bookingId, userId },
      include: { payment: true },
    });

    if (!booking) {
      throw new NotFoundError("Booking not found");
    }

    if (booking.status === "EXPIRED") {
      throw new BadRequestError("Booking expired");
    }

    if (booking.payment) {
      throw new ConflictError("Payment already exists");
    }

    if (booking.status !== "PENDING") {
      throw new ConflictError("Booking already processed");
    }

    const payment = await tx.payment.create({
      data: {
        bookingId,
        amount,
        status: "PAID",
        paidAt: new Date(),
      },
    });

    await tx.booking.update({
      where: { id: bookingId },
      data: {
        status: "CONFIRMED",
      },
    });

    return payment;
  });
}
