const catchAsync = require('../utils/catchAsync');
const Category = require('../models/categoryModel');

const AppError = require('../utils/AppError');
const { getCustomLabel, MESSAGES } = require('../labels');
const Format = require('string-format');

const getCategoriesTree = catchAsync(async (req, res, next) => {
  const categories = await Category.find({}).populate('subcategories');

  return res.status(200).json({
    status: 'success',
    categories,
  });
});

const createCategory = catchAsync(async (req, res, next) => {
  const category = await Category.create(req.body);

  return res.status(200).json({
    status: 'success',
    category,
  });
});

const updateCategory = catchAsync(async (req, res, next) => {
  const categoryId = req.params.categoryId;

  if (!categoryId) {
    return next(new AppError(getCustomLabel(req, MESSAGES.CATEGORY_ID_NOT_SPECIFIED)));
  }

  const category = await Category.findByIdAndUpdate(categoryId, req.body, {
    new: true,
  });

  if (!category) {
    return next(new AppError(Format(getCustomLabel(req, MESSAGES.CATEGORY_NOT_FOUND_FORMAT), 404)));
  }

  res.status(200).json({ status: 'success', category });
});

module.exports = {
  getCategoriesTree,
  createCategory,
  updateCategory,
};
