import { prisma } from "../lib/prisma";
import { RegisterRequest } from "../validators/auth.schema";
import { BadRequestError } from "../shared/errors/BadRequestError";
import bcrypt from "bcrypt";

export const registerService = async (data: RegisterRequest) => {
  const { email, first_name, last_name } = data;

  const existing = await prisma.user.findFirst({
    where: {
      email: data.email,
    },
  });

  if (existing) {
    throw new BadRequestError("User already exists");
  }

  const hashed = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashed,
      first_name,
      last_name,
    },
  });

  const { password, ...safeUser } = user;
  return safeUser;
};
