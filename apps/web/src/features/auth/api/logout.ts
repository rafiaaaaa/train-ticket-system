import { api } from "@/utils/api";

export const logout = () => {
  const res = api("/auth/logout", {
    method: "POST",
  });

  return res;
};
