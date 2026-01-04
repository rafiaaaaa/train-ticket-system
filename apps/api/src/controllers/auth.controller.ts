import { Request, Response } from "express";
import { registerService } from "../services/auth.service";

export const registerUser = async (req: Request, res: Response) => {
  const user = await registerService(req.body);

  return res.status(201).json({
    success: true,
    data: user,
  });
};
