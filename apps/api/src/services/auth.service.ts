import { prisma } from "../lib/prisma";
import { LoginRequest, RegisterRequest } from "../validators/auth.schema";
import { BadRequestError } from "../shared/errors/BadRequestError";
import bcrypt from "bcrypt";
import { signJwt, signRefreshJwt, verifyRefreshJwt } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";

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

  const payload = {
    userId: existingUser.id,
    email: existingUser.email,
    role: "USER" as JwtPayload["role"],
  };

  const accessToken = signJwt(payload);
  const refreshToken = signRefreshJwt(payload);

  const { password: existingUserPassword, ...safeUser } = existingUser;

  return {
    user: safeUser,
    token: {
      accessToken,
      refreshToken,
    },
  };
};

export const meService = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    omit: {
      password: true,
    },
  });

  return user;
};

export const refreshTokenService = async (refreshToken: string) => {
  const refreshIsValid = await verifyRefreshJwt(refreshToken);

  if (!refreshIsValid) {
    throw new BadRequestError("Invalid refresh token");
  }

  const payload = {
    userId: refreshIsValid.userId,
    email: refreshIsValid.email,
    role: refreshIsValid.role,
  };

  const newAccessToken = signJwt(payload);
  const newRefreshToken = signRefreshJwt(payload);

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};
