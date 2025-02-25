import { Router } from "express";
import { signUp } from "../resolvers/auth/authSignUp.js";
import { signIn } from "../resolvers/auth/authSignIn.js";

export const authRouter = Router();

authRouter.post("/sign-up", signUp); // Sign Up
authRouter.post("/sign-in", signIn); // Sign In
authRouter.post("/sign-out", (req, res) => res.send({ title: "Sign out" })); // Sign Out
