import { api } from "@/utils/api";

export type LoginPayload = {
  email: string;
  password: string;
};

export const login = (payload: LoginPayload) => {
  const user = api("/auth/login", {
    method: "POST",
    body: payload,
  });

  return user;
};
