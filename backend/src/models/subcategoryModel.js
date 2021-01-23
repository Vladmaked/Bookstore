const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const subCategorySchema = new Schema({
  name: { type: String },
  photo: { type: String },
  categoryId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
  },
});

module.exports = mongoose.model('Subcategory', subCategorySchema);
