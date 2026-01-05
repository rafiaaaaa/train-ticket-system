import { prisma } from "../lib/prisma";
import { LoginRequest, RegisterRequest } from "../validators/auth.schema";
import { BadRequestError } from "../shared/errors/BadRequestError";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt";

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

export const loginService = async (data: LoginRequest) => {
  const { email, password } = data;

  const existingUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!existingUser) {
    throw new BadRequestError("User not found");
  }

  const passwordValid = await bcrypt.compare(password, existingUser.password);
  if (!passwordValid) {
    throw new BadRequestError("Invalid Password");
  }

  const token = jwt.sign(
    {
      userId: existingUser.id,
    },
    jwtConfig.secret,
    { expiresIn: jwtConfig.expiresIn as jwt.SignOptions["expiresIn"] }
  );

  const { password: existingUserPassword, ...safeUser } = existingUser;

  return {
    user: safeUser,
    token,
  };
};
