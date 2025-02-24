import express from "express";
import { getUsers } from "../resolvers/users/get-users.js";
import { getUser } from "../resolvers/users/get-user.js";
import { authorize } from "../middleware/authMiddleWare.js";

export const usersRouter = express.Router();

usersRouter.get("/", getUsers);	// Get All Users
usersRouter.get("/:id", authorize, getUser); // Get User Details
usersRouter.post("/", getUsers); // Create New User
usersRouter.put("/:id", getUsers); // Update User
usersRouter.delete("/:id", getUsers); // Delete User