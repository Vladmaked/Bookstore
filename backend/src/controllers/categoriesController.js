const catchAsync = require('../utils/catchAsync');
const Category = require('../models/categoryModel');
const Subcategory = require('../models/subcategoryModel');
const AppError = require('../utils/AppError');
const { getCustomLabel, MESSAGES } = require('../labels');
const Format = require('string-format');
const { Types } = require('mongoose');

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
  const categoryId = req.params.id || req.body.id || req.body._id;

  if (!categoryId) {
    return next(new AppError(getCustomLabel(req, MESSAGES.CATEGORY_ID_NOT_SPECIFIED)));
  }

  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!category) {
    return next(new AppError(Format(getCustomLabel(req, MESSAGES.CATEGORY_NOT_FOUND_FORMAT), 404)));
  }

  res.status(200).json({ status: 'success', category });
});

const updateSubcategory = catchAsync(async (req, res, next) => {
  const subcategoryId = req.params.id || req.body.id || req.body._id;

  if (!subcategoryId) {
    return next(new AppError(getCustomLabel(req, MESSAGES.SUBCATEGORY_ID_NOT_SPECIFIED)));
  }

  const [category] = await Category.find({ 'subcategories._id': new Types.ObjectId(subcategoryId) }).populate(
    'subcategories'
  );

  let subcategory = category.subcategories.find((el) => el._id.toString() === subcategoryId);

  if (!subcategory) {
    return next(new AppError(Format(getCustomLabel(req, MESSAGES.SUBCATEGORY_NOT_FOUND_FORMAT), 404)));
  }

  subcategory = { ...subcategory, ...req.body };

  const result = await category.save();

  res.status(200).json({ status: 'success', subcategory: result });
});

const createSubcategory = catchAsync(async (req, res, next) => {
  const parentCategoryId = req.params?.id;

  if (!parentCategoryId) {
    return next(new AppError(getCustomLabel(req, MESSAGES.CATEGORY_ID_NOT_SPECIFIED)));
  }

  const parentCategory = await Category.findById(parentCategoryId);

  if (!parentCategory) {
    return next(new AppError(Format(getCustomLabel(req, MESSAGES.CATEGORY_NOT_FOUND_FORMAT), 404)));
  }

  parentCategory.subcategories.push({ ...req.body });

  const result = await parentCategory.save();

  const lastSubCatIndex = result._doc.subcategories.length - 1;

  return res.status(200).json({
    status: 'success',
    subcategory: result._doc.subcategories[lastSubCatIndex]._doc,
  });
});

module.exports = {
  getCategoriesTree,
  createCategory,
  createSubcategory,
  updateCategory,
  updateSubcategory,
};
