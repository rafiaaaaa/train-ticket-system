import { prisma } from "../../../lib/prisma";

export async function expireBookings() {
  console.log("Checking for expired bookings...");
  await prisma.$transaction(async (tx) => {
    const expired = await tx.booking.findMany({
      where: {
        status: "PENDING",
        expiresAt: { lt: new Date() },
      },
    });
    console.log(`Found ${expired.length} expired bookings`);
    if (expired.length === 0) return;

    const bookingIds = expired.map((b) => b.id);

    await tx.bookingSeat.deleteMany({
      where: { bookingId: { in: bookingIds } },
    });

    await tx.booking.updateMany({
      where: { id: { in: bookingIds } },
      data: { status: "EXPIRED" },
    });
  });
}
