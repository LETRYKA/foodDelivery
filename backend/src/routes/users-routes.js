import express from "express";
import { getUsers } from "../resolvers/users/get-users.js";

export const usersRouter = express.Router();

usersRouter.get("/", getUsers);
