import { api } from "@/utils/api";

export async function createPayment(bookingId: string) {
  const res = await api("/payment", {
    method: "POST",
    body: {
      bookingId,
    },
  });

  return res.data;
}
