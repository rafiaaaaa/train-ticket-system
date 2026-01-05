import jwt, { SignOptions } from "jsonwebtoken";
import { jwtConfig } from "../config/jwt";

const { secret, expiresIn } = jwtConfig;
export interface JwtPayload {
  userId: string;
  email: string;
  role: "USER" | "ADMIN"; // useful when we need to differentiate between different roles, but for now it's not needed
}

export function signJwt(payload: JwtPayload) {
  return jwt.sign(payload, secret, {
    expiresIn: expiresIn as SignOptions["expiresIn"],
  });
}

export function verifyJwt(token: string): JwtPayload {
  return jwt.verify(token, secret) as JwtPayload;
}
