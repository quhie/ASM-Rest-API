const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
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

categorySchema.pre('save', function(next) {
  if (!this.isNew) {
    this.updateAt = Date.now();
  }
  next();
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
