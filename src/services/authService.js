import User from "../models/User.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { generateAccessToken } from "../utils/jwt.js";

export async function register(email, password) {
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) throw new Error("Email already exists");

  const hashed = await hashPassword(password);
  const user = await User.create({ email, password_hash: hashed });
  const token = generateAccessToken(user.id);

  return {
    user: { id: user.id, email: user.email, role: user.role },
    accessToken: token,
  };
}

export async function login(email, password) {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("Invalid email or password");

  const isValid = await comparePassword(password, user.password_hash);
  if (!isValid) throw new Error("Invalid email or password");

  const token = generateAccessToken(user.id);
  return {
    user: { id: user.id, email: user.email, role: user.role },
    accessToken: token,
  };
}