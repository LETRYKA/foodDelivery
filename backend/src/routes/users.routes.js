import express from "express";
import { getUsers } from "../resolvers/users/get-users.js";
import { getUser } from "../resolvers/users/get-user.js";
import { getMe } from "../resolvers/users/me.js";
import { authorize } from "../middleware/authMiddleWare.js";
import { updateUser } from "../resolvers/users/update-user.js";
import { deleteUser } from "../resolvers/users/delete-user.js";

export const usersRouter = express.Router();

usersRouter.get("/", getUsers); // Get All Users
usersRouter.get("/me", authorize, getMe); // Get Me Data
usersRouter.get("/:id", authorize, getUser); // Get User Details
usersRouter.post("/", getUsers); // Create New User
usersRouter.put("/:id", updateUser); // Update User
usersRouter.delete("/:id", deleteUser); // Delete User
