const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const Subcategory = require('./subcategoryModel');

const categorySchema = new Schema({
  name: { type: String },
  photo: { type: String },
  subcategories: [Subcategory.schema],
});

module.exports = mongoose.model('Category', categorySchema);
