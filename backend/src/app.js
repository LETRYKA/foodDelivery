import connectToDatabase from "../database/mongodb.js";
import { usersRouter } from "./routes/users.routes.js";
import { authRouter } from "./routes/auth.routes.js";
import { foodRouter } from "./routes/food.routes.js";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 4000;

// Allow local frontends to access the API with credentials
const allowedOrigins = [
  "http://localhost:3000", // frontend
  "http://localhost:3001", // dashboard
  "http://localhost:3002", // optional
];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
mongoose.connect(process.env.MONGODB_STRING);

app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/food", foodRouter);

app.listen(port, async () => {
  console.log(`🟢 Server is running on port ${port}`);
  await connectToDatabase();
});
