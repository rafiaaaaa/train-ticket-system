import { api } from "@/utils/api";
import { createBookingRequest } from "@repo/shared";

export const createBooking = async (payload: createBookingRequest) => {
  const res = await api("/bookings", {
    method: "POST",
    body: payload,
  });

  return res.data;
};
