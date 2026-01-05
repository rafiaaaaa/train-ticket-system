import { Request, Response } from "express";
import { loginService, registerService } from "../services/auth.service";

export const registerUser = async (req: Request, res: Response) => {
  const user = await registerService(req.body);

  return res.status(201).json({
    success: true,
    data: user,
  });
};

export const loginUser = async (req: Request, res: Response) => {
  const data = await loginService(req.body);

  res.cookie("access_token", data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 1000 * 60 * 60,
  });

  return res.status(200).json({
    success: true,
    data,
  });
};
