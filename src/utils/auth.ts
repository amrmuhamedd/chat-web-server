// src/utils/auth.ts
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "@entities/user";

const saltRounds = 10;
const secretKey = "kjdhfiouhduihfa"; // Replace with your actual secret key for JWT

export async function hashPassword(password: string): Promise<string> {
  if (!password || password.trim() === "") {
    throw new Error("Password cannot be empty.");
  }

  return bcrypt.hash(password, saltRounds);
}

export async function comparePasswords(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export function generateAuthToken(user: User): string {
  const payload = {
    _id: user?.getId().toString(),
    email: user?.getEmail(),
  };

  return jwt.sign(payload, secretKey, {
    expiresIn: "1h",
  });
}
