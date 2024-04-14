const Product = require('../models/Product');

exports.createProduct = async (req, res, next) => {
  const { name, description, image, price, size, quantity, category, type, brand, role, available } = req.body;
  try {
    const product = new Product({ name, description, image, price, size, quantity, category, type, brand, role, available });
    await product.save();
    res.status(201).json({ status: 'Product created successfully', product });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProduct = async (req, res, next) => {
 const { name, description, image, price, size, quantity, category, type, brand, role, available } = req.body;
  const productData = { name, description, image, price, size, quantity, category, type, brand, role, available };

  try {
    const product
  = await Product.findByIdAndUpdate(req.params.id, productData, { new: true });
    res.status(200).json({ status: 'Product updated successfully', product });
  }
  catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      res.status(404).json({ status: 'Product not found' });
      return;
    }

    res.status(200).json({ status: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.searchProduct = async (req, res, next) => {
  try {
    const products = await Product.find({ name: { $regex: req.params.name, $options: 'i' } });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getProductByCategory = async (req, res, next) => {
   try {
      const products = await Product.find({ category: req.params.id });
      res.json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }

};


// ...
exports.createOrder = async (req, res, next) => {
  const { user, cart, total } = req.body; // Get total price from the request
  // Create a new order
  const order = new Order({ user, cart, total });
  await order.save();
  res.status(201).json({ status: 'Order created successfully' });
};
// ...
