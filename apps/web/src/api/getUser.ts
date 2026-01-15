import { api } from "@/utils/api";

export const getUser = async () => {
  const res = await api("/auth/me");
  if (res.success) return res.data;
  return null;
};
