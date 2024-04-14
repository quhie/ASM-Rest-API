const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  size: {
    type: String
  },
  quantity: {
    type: Number,
    min: 0,
    default: 0
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  type: {
    type: String
  },
  brand: {
    type: String
  },
  role: {
    type: Number,
    default: 1
  },
  available: {
    type: Boolean,
    default: true
  },
  createAt: {
    type: Date,
    default: Date.now
  },
  updateAt: {
    type: Date,
    default: Date.now
  }
});

productSchema.pre('save', function(next) {
  if (!this.isNew) {
    this.updateAt = Date.now();
  }
  next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
