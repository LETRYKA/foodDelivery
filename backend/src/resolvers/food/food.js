import Food from "../../models/food-schema.js";

export const createFood = async (req, res, next) => {
  try {
    const food = new Food(req.body);
    await food.save();
    res
      .status(201)
      .json({ success: true, message: "Food created", data: food });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
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
    const updates = req.body;

    const updatedFood = await Food.findByIdAndUpdate(foodId, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedFood) {
      return res
        .status(404)
        .json({ success: false, message: "Food item not found" });
    }

    res.status(200).json({
      success: true,
      message: "Food item updated successfully",
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

    res
      .status(200)
      .json({ success: true, message: "Food item deleted successfully" });
  } catch (err) {
    next(err);
  }
};
