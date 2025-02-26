import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { TOKEN_EXPIRES_IN, TOKEN_SECRET } from "../../../config/env.js";
import User from "../../models/user-schema.js";

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { name, email, password, phoneNumber } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 409;
      throw error;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUsers = await User.create(
      [{ name, email, password: hashedPassword, phoneNumber }],
      { session }
    );
    12;

    const token = jwt.sign({ userId: newUsers[0]._id }, TOKEN_SECRET, {
      expiresIn: "200h",
    });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        token,
        user: newUsers[0],
      },
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    next(err);
  }
};
