import express from "express";
import cors from "cors"; // Import CORS
import { usersRouter } from "./routes/users-routes.js";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();
const port = process.env.PORT;
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

mongoose.connect(process.env.MONGODB_STRING);

app.use(express.json());

app.use("/user", usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
