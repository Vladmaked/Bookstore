const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const categorySchema = new Schema({
  name: { type: String },
  photo: { type: String },
  id: { type: String },
  iSubcategory: { type: Boolean },
});

module.exports = mongoose.model('Category', categorySchema);
