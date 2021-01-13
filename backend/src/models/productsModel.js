const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const productSchema = new Schema({
  category: String,
  subcategory: String,
  title: String,
  author: String,
  photo: String,
  info: String,
  price: Number,
  date: Date,
  id: String,
  quantityInStock: Number,
});

module.exports = mongoose.model('Product', productSchema);
