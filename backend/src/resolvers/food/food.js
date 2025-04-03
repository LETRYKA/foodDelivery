import Food from "../../models/food-schema.js";
import Category from "../../models/category-schema.js";

export const createFood = async (req, res, next) => {
  try {
    const { foodName, description, price, image, categories } = req.body;

    // const existingCategory = await Category.findById(categories);
    // if (!existingCategory) {
    //   return res
    //     .status(404)
    //     .json({ success: false, message: "Food not found" });
    // }

    const newFood = new Food({
      foodName,
      description,
      price,
      image,
      categories: ["67bf3cb5f8bb892a1e1e62db"],
    });
    await newFood.save();

    res.status(201).json({ success: true, data: newFood });
  } catch (err) {
    next(err);
  }
};

export const getFoods = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  try {
    const totalCount = await Food.countDocuments();

    const foods = await Food.find().skip(skip).limit(limit).populate({
      path: "Category",
      select: "name",
      strictPopulate: false,
    });

    const totalPages = Math.ceil(totalCount / limit);

    res.status(200).json({
      success: true,
      data: foods,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        totalCount: totalCount,
        limit: limit,
      },
    });
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
    const { categoryId, foodName, description, price, image } = req.body;

    const updatedFood = await Food.findByIdAndUpdate(
      foodId,
      {
        $set: { foodName, description, price, image },
        $addToSet: { categories: categoryId },
      },
      { new: true, runValidators: true }
    ).populate("categories");

    if (!updatedFood) {
      return res
        .status(404)
        .json({ success: false, message: "Food item not found" });
    }

    res.status(200).json({
      success: true,
      message: "Food updated successfully",
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

export const getFoodByCategory = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  try {
    const { categoryId } = req.params;

    if (!categoryId) {
      return res
        .status(400)
        .json({ success: false, message: "Unknown category id" });
    }

    const totalCount = await Food.countDocuments();

    const foods = await Food.find({ categories: categoryId }).populate({
      path: "categories",
      select: "name",
    });

    const totalPages = Math.ceil(totalCount / limit);

    if (foods.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No items",
      });
    }

    res.status(200).json({
      success: true,
      data: foods,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        totalCount: totalCount,
        limit: limit,
      },
    });
  } catch (err) {
    next(err);
  }
  // ?page=$1&limit=$2
};
