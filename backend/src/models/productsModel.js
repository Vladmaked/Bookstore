const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const paginate = require('mongoose-paginate');

const productSchema = new Schema({
  categoryId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
  },
  subcategoryId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Subcategory',
  },
  title: String,
  author: String,
  photo: String,
  info: String,
  price: Number,
  date: Date,
  id: String,
  quantityInStock: Number,
});

productSchema.plugin(paginate);

module.exports = mongoose.model('Product', productSchema);
