import { api } from "@/utils/api";

export type Seat = {
  id: string;
  number: string;
  isAvailable: boolean;
};

export type ScheduleSeatResponse = {
  schedule: {
    id: string;
    train: {
      name: string;
      code: string;
      totalSeats: number;
    };
    price: number;
    origin: string;
    destination: string;
    departureTime: string;
    arrivalTime: string;
  };
  seats: Seat[];
};

export const getSchedule = async (
  scheduleId: string,
): Promise<ScheduleSeatResponse> => {
  if (!scheduleId) {
    throw new Error("scheduleId is required");
  }

  const res = await api(`/train/schedules/${scheduleId}/seats`);
  return res.data;
};
