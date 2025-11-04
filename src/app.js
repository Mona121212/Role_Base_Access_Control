import express from "express";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import sequelize from "./config/db.js";const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

await sequelize.sync(); 

export default app;