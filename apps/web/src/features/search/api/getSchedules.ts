import { api } from "@/utils/api";

type GetSchedulesParams = {
  from?: string;
  to?: string;
  date?: string;
  passengers?: string;
};

export const getSchedules = async (params: GetSchedulesParams) => {
  const searchParams = new URLSearchParams();

  if (params.from) searchParams.set("from", params.from);
  if (params.to) searchParams.set("to", params.to);
  if (params.date) searchParams.set("date", params.date);
  if (params.passengers) searchParams.set("passengers", params.passengers);

  const res = await api(
    `/train/schedules${
      searchParams.toString() ? `?${searchParams.toString()}` : ""
    }`,
  );

  return res.data;
};
