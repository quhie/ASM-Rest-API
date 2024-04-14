const Category = require('../models/Category');

exports.createCategory = async (req, res, next) => {
  const { name, available } = req.body;
  try {
    const category = new Category({ name, available });
    await category.save();
    res.status(201).json({ status: 'Category created successfully', category });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateCategory = async (req, res, next) => {
  const { name, available } = req.body;
  const categoryData = { name, available };

  try {
    const category = await Category.findByIdAndUpdate(req.params.id, categoryData, { new: true });
    res.status(200).json({ status: 'Category updated successfully', category });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      res.status(404).json({ status: 'Category not found' });
      return;
    }

    res.status(200).json({ status: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
