const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const categorySchema = new Schema(
  {
    name: { type: String },
    photo: { type: String },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

categorySchema.pre('remove', async function (next) {
  await this.model('Subcategory').deleteMany({ categoryId: this._id });

  next();
});

categorySchema.virtual('subcategories', {
  ref: 'Subcategory',
  localField: '_id',
  foreignField: 'categoryId',
  justOne: false,
});

module.exports = mongoose.model('Category', categorySchema);
