import { createBookingWithLock } from "../services/booking.service";

async function run() {
  try {
    const booking = await createBookingWithLock({
      userId: "dummy-user-id",
      scheduleId: "dummy-schedule-id",
      seatIds: ["seat-1", "seat-2"],
    });

    console.log("BOOKING SUCCESS:", booking);
  } catch (error) {
    console.error("BOOKING FAILED:", error);
  }
}

run();
