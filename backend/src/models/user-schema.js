import mongoose from "mongoose";
import Order from "./order-schema.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User Name is required"],
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Email address is not valid"],
    },
    password: {
      type: String,
      required: [true, "User password is required"],
      minLength: 6,
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
    },
    address: {
      type: String,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    orderedFoods: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
