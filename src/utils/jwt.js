import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


export function generateAccessToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "15m" });
}

export function verifyAccessToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}