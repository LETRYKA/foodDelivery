import User from "../../models/user-schema.js"

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, data: users })
  } catch (err) {
    next(err)
  }
};
