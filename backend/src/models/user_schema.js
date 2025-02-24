import mongoose from "mongoose"

const userSchema = new mongoose.Schema()

export const Users = mongoose.model("Users", userSchema)