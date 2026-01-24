import { api } from "@/utils/api";

export const getBooking = async (bookingId: string) => {
  const res = await api("/bookings/" + bookingId);

  return res.data;
};
