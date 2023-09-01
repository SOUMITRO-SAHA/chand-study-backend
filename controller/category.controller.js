const categoryModel = require("../models/category.model");
const { categoryValidator } = require("../validator/category.validation");

exports.getAllCategory = async (req, res) => {
	try {
		const categories = await categoryModel.findAll();
		res.status(200).json(categories);
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ error: "An error occurred while fetching categories." });
	}
};

exports.createNewCategory = async (req, res) => {
	try {
		const { error, value } = categoryValidator.validate(req.body);

		if (error) {
			return res.status(400).json({
				success: false,
				message: error.message,
			});
		}

		const { categoryName } = value;

		// Check if the category name is provided
		if (!categoryName) {
			return res.status(400).json({ error: "Category name is required." });
		}

		// Check if the category already exists
		const existingCategory = await categoryModel.findOne({
			where: { categoryName },
		});

		if (existingCategory) {
			return res.status(400).json({ error: "Category already exists." });
		}

		const newCategory = await categoryModel.create({ categoryName });
		res.status(200).json(newCategory);
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ error: "An error occurred while creating the category." });
	}
};

exports.updateCategory = async (req, res) => {
	try {
		const { categoryId } = req.params;
		const { error, value } = categoryValidator.validate(req.body);

		if (error) {
			return res.json({
				success: false,
				message: error.message,
			});
		}

		const { categoryName } = value;

		const category = await categoryModel.findByPk(categoryId);

		if (!category) {
			return res.status(404).json({ error: "Category not found." });
		}

		// Check if the new category name already exists
		if (categoryName) {
			const existingCategory = await categoryModel.findOne({
				where: { categoryName },
			});
			if (existingCategory && existingCategory.id !== parseInt(categoryId)) {
				return res
					.status(400)
					.json({ error: "Category name is already in use." });
			}
		}

		category.categoryName = categoryName || category.categoryName;
		await category.save();

		res.json(category);
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ error: "An error occurred while updating the category." });
	}
};

exports.deleteCategory = async (req, res) => {
	try {
		const { categoryId } = req.params;

		const category = await Category.findByPk(categoryId);
		if (!category) {
			return res.status(404).json({ error: "Category not found." });
		}

		await category.destroy();
		res.status(204).json({
			success: true,
			message: "Category deleted successfully",
		});
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ error: "An error occurred while deleting the category." });
	}
};
