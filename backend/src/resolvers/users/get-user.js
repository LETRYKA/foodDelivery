import User from "../../models/user-schema.js";

export const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id)
      .select("-password")
      .populate({
        path: "orderedFoods",
        populate: {
          path: "items.food",
          select: "name price image",
        },
      });

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};
