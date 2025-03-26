import connectToDatabase from "../database/mongodb.js";
import { usersRouter } from "./routes/users.routes.js";
import { authRouter } from "./routes/auth.routes.js";
import { foodRouter } from "./routes/food.routes.js";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();

app.use(cors({ origin: "*", credentials: false }));
app.use(express.json());

// Connect to MongoDB
await connectToDatabase();
mongoose.connect(process.env.MONGODB_STRING);

app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/food", foodRouter);

export default app;
