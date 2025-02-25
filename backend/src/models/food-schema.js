import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Food name is required"],
      trim: true,
      minLength: 2,
      maxLength: 100,
    },
    description: {
      type: String,
      trim: true,
      maxLength: 500,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be a positive number"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["Beverage", "Appetizer", "Main Course", "Dessert", "Snack"],
    },
    imageUrl: {
      type: String,
      required: [true, "Image URL is required"],
      match: [
        /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/,
        "Invalid image URL format",
      ],
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Food = mongoose.model("Food", foodSchema);

export default Food;
