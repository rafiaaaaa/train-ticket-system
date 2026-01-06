import { prisma } from "../../lib/prisma";

export async function payBooking({
  bookingId,
  amount,
}: {
  bookingId: string;
  amount: number;
}) {
  return prisma.$transaction(async (tx) => {
    const booking = await tx.booking.findUnique({
      where: { id: bookingId },
      include: { payment: true },
    });

    if (!booking) {
      throw new Error("Booking not found");
    }

    if (booking.status === "EXPIRED") {
      throw new Error("Booking expired");
    }

    if (booking.payment) {
      throw new Error("Payment already exists");
    }

    if (booking.status !== "PENDING") {
      throw new Error("Booking already processed");
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
