import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import User from "../models/User.js";

const router = express.Router();

// Admin only
router.get("/", authenticateToken, async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ error: "Access denied" });

  const users = await User.findAll({ attributes: ["id", "email", "role"] });
  res.json(users);
});

// Authenticated users
router.get("/:id", authenticateToken, async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    attributes: ["id", "email", "role"],
  });
  if (!user) return res.status(404).json({ error: "User not found" });

  res.json(user);
});

export default router;