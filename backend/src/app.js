import connectToDatabase from "../database/mongodb.js";
import { usersRouter } from "./routes/users.routes.js";
import { authRouter } from "./routes/auth.routes.js"
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
const port = process.env.PORT;
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
mongoose.connect(process.env.MONGODB_STRING);

app.use(express.json());


app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);

app.listen(port, async () => {
  console.log(`🟢 Server is running on port ${port}`);
  await connectToDatabase()
});
