import User from "../../models/user-schema.js";

export const getMe = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const user = await User.findById(userId)
      .select("-password")
      .populate({
        path: "orderedFoods",
        populate: {
          path: "items.food",
          select: "foodName price image",
        },
      });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};
