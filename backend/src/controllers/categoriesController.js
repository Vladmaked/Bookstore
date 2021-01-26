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

const getCategory = catchAsync(async (req, res, next) => {
  const categoryId = req.params.categoryId;

  if (!categoryId) {
    return next(new AppError(getCustomLabel(req, MESSAGES.CATEGORY_ID_NOT_SPECIFIED)));
  }

  const category = await Category.findByIdAndUpdate(categoryId, req.body, { new: true });

  if (!category) {
    return next(new AppError(Format(getCustomLabel(req, MESSAGES.CATEGORY_NOT_FOUND_FORMAT), categoryId), 404));
  }

  res.status(200).json({
    status: 'success',
    category,
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
    return next(new AppError(Format(getCustomLabel(req, MESSAGES.CATEGORY_NOT_FOUND_FORMAT), categoryId), 404));
  }

  res.status(200).json({ status: 'success', category });
});

const deleteCategory = catchAsync(async (req, res, next) => {
  const categoryId = req.params.categoryId || req.body.id || req.body._id;

  if (!categoryId) {
    return next(new AppError(getCustomLabel(req, MESSAGES.CATEGORY_ID_NOT_SPECIFIED), 400));
  }

  await Category.findByIdAndDelete(categoryId);

  return res.status(204).end();
});

module.exports = {
  getCategoriesTree,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
};
