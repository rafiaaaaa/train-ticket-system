import { api } from "@/utils/api";

export type RegisterPayload = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName?: string;
};

export const signup = (payload: RegisterPayload) => {
  const body = {
    email: payload.email,
    password: payload.password,
    confirm_password: payload.confirmPassword,
    first_name: payload.firstName,
    last_name: payload.lastName ? payload.lastName : undefined,
  };
  const user = api("/auth/register", {
    method: "POST",
    body,
  });

  return user;
};
