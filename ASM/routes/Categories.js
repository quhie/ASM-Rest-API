var express = require('express');
var router = express.Router();

const CategoryController = require('../controller/CategoryController');

router.post('/', CategoryController.createCategory);

router.get('/', CategoryController.getAllCategories);

router.get('/:id', CategoryController.getCategoryById);

router.put('/:id', CategoryController.updateCategory);

router.delete('/:id', CategoryController.deleteCategory);

module.exports = router;
