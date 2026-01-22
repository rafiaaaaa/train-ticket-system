import { api } from "@/utils/api";

export const getStations = async (q?: string) => {
  const res = await api("/train/stations?q=" + q);

  return res.data;
};
