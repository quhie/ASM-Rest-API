var express = require('express');
var router = express.Router();

const ProductController = require('../controller/ProductController');

router.get('/', ProductController.getAllProducts);

router.post('/', ProductController.createProduct);

router.get('/:id', ProductController.getProductById);

router.put('/:id', ProductController.updateProduct);

// Products.js
router.get('/search/:name', ProductController.searchProduct);

router.get('/category/:id', ProductController.getProductByCategory);

router.delete('/:id', ProductController.deleteProduct);

router.post('/orders', ProductController.createOrder);




module.exports = router;
