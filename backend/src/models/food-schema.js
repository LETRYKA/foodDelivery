import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    foodName: {
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
      min: [0],
    },
    image: {
      type: String,
      required: false,
      match: [
        /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/s,
        "Invalid image URL",
      ],
    },
    ingredients: {
      type: String,
      required: false,
    },
    categories: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category"
    }]
  },
  { timestamps: true }
);

const Food = mongoose.model("Food", foodSchema);

export default Food;
