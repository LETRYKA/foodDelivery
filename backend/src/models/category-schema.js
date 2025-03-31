import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Category name is required"],
		unique: true,
		trim: true
	},
	emoji: {
		type: String,
		required: false,
	},
	image: {
		type: String,
		required: false,
		match: [
		  /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/s,
		  "Invalid image URL",
		],
	  },
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
