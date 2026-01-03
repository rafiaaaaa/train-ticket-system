import { createBookingWithLock } from "../services/booking.service";

//  delete the bookingSeat and booking entries created by this script after testing to avoid data pollution
async function run() {
  try {
    const booking = await createBookingWithLock({
      userId: "9ef474d3-86a3-40e3-a3ff-99b23af63bc4",
      scheduleId: "666aaf77-a380-41cf-b6a4-024d7e6834d6",
      seatIds: [
        "60d6013e-2290-41c5-a8d3-88153bb4b6a2",
        "839f4604-209a-425d-b081-7fabb408e22f",
      ],
    });

    console.log("BOOKING SUCCESS:", booking);
  } catch (error) {
    console.error("BOOKING FAILED:", error);
  }
}

run();
