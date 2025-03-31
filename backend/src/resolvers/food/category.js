import Category from "../../models/category-schema.js";

export const getCategories = async (req, res, next) => {
	try {
		const categories = await Category.find();
		res.status(200).json({ success: true, data: categories });
	} catch (err) {
		next(err);
	}
};

// Create new category
export const createCategory = async (req, res, next) => {
	try {
		const { name, emoji, image } = req.body;

		if (!name) {
			return res.status(400).json({ success: false, message: "Category name is required" });
		}

		const categoryExists = await Category.findOne({ name });
		if (categoryExists) {
			return res.status(400).json({ success: false, message: "Category already exists" });
		}

		const newCategory = new Category({ name, emoji, name });
		await newCategory.save();

		res.status(201).json({ success: true, message: "Category created", data: newCategory });
	} catch (err) {
		next(err);
	}
};

// Update a food category
export const updateCategory = async (req, res, next) => {
	try {
		const { categoryId } = req.params;
		const { name, emoji, image } = req.body;

		const updatedCategory = await Category.findByIdAndUpdate(
			categoryId,
			{ name, emoji, image },
			{ new: true, runValidators: true }
		);

		if (!updatedCategory) {
			return res.status(404).json({ success: false, message: "Category not found" });
		}

		res.status(200).json({ success: true, message: "Category updated", data: updatedCategory });
	} catch (err) {
		next(err);
	}
};

// Delete a food category
export const deleteCategory = async (req, res, next) => {
	try {
		const { categoryId } = req.params;

		const deletedCategory = await Category.findByIdAndDelete(categoryId);

		if (!deletedCategory) {
			return res.status(404).json({ success: false, message: "Category not found" });
		}

		res.status(200).json({ success: true, message: "Category deleted" });
	} catch (err) {
		next(err);
	}
};
