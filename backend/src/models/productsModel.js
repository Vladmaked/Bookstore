const fs = require('fs');
const util = require('util');
const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const paginate = require('mongoose-paginate');

const unlinkAsync = util.promisify(fs.unlink);

const IMG_PATH = './data/img';

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
  promo: String,
  description: String,
  price: Number,
  date: Date,
  quantityInStock: Number,
});

productSchema.pre('findOneAndDelete', async function (next) {
  const prod = await this.findOne();

  if (prod.photo) {
    try {
      await Promise.all([
        unlinkAsync(`${IMG_PATH}/original/${prod.photo}`),
        unlinkAsync(`${IMG_PATH}/small/${prod.photo}`),
      ]);
    } catch (er) {
      console.log('Error on photo delete: ', er);
    }
  }
  next();
});

productSchema.plugin(paginate);

module.exports = mongoose.model('Product', productSchema);
