import express from "express";
import { register, login } from "../services/authService";
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password || password.length < 8)
      return res.status(400).json({ error: "Invalid email or password" });

    const result = await register(email, password);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await login(email, password);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/me", authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

export default router;