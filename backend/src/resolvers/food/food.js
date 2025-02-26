import Food from "../../models/food-schema.js";
import Category from "../../models/category-schema.js";

export const createFood = async (req, res, next) => {
  try {
    const { foodName, price, image, category } = req.body;

    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    const newFood = new Food({ foodName, price, image, category });
    await newFood.save();

    res.status(201).json({ success: true, data: newFood });
  } catch (err) {
    next(err);
  }
};

export const getFoods = async (req, res, next) => {
  try {
    const foods = await Food.find().populate("category", "name"); // Only get category name

    res.status(200).json({ success: true, data: foods });
  } catch (err) {
    next(err);
  }
};



export const getFoodById = async (req, res, next) => {
  try {
    const { foodId } = req.params;
    const food = await Food.findById(foodId);

    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: "Food item not found" });
    }

    res.status(200).json({ success: true, data: food });
  } catch (err) {
    next(err);
  }
};

export const updateFood = async (req, res, next) => {
  try {
    const { foodId } = req.params;
    const { categoryId } = req.body;

    const updatedFood = await Food.findByIdAndUpdate(
      foodId,
      { $addToSet: { categories: categoryId } },
      { new: true, runValidators: true }
    ).populate("categories");

    if (!updatedFood) {
      return res.status(404).json({ success: false, message: "Food item not found" });
    }

    res.status(200).json({
      success: true,
      message: "Category added to food successfully",
      data: updatedFood,
    });
  } catch (err) {
    next(err);
  }
};


export const deleteFood = async (req, res, next) => {
  try {
    const { foodId } = req.params;
    const deletedFood = await Food.findByIdAndDelete(foodId);

    if (!deletedFood) {
      return res
        .status(404)
        .json({ success: false, message: "Food item not found" });
    }

    res.status(200).json({
      success: true,
      message: "Food item deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

