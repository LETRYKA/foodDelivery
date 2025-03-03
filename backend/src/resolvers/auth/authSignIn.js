import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { TOKEN_EXPIRES_IN, TOKEN_SECRET } from "../../../config/env.js";
import User from "../../models/user-schema.js";

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      return res.status(404).json({
        success: false,
        message: error.message,
        statusCode: error.statusCode
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      const error = new Error("Password is not valid");
      error.statusCode = 401;
      return res.status(401).json({
        success: false,
        message: error.message,
        statusCode: error.statusCode
      });
    }

    const token = jwt.sign({ userId: user._id }, TOKEN_SECRET, {
      expiresIn: "200h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Successfully logged in",
      data: {
        token,
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};
