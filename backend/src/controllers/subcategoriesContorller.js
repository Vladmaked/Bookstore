const catchAsync = require('../utils/catchAsync');
const Category = require('../models/categoryModel');
const Product = require('../models/productsModel');
const Subcategory = require('../models/subcategoryModel');
const AppError = require('../utils/AppError');
const Format = require('string-format');
const { getCustomLabel, MESSAGES } = require('../labels');
const APIFeatures = require('../utils/ApiFeatures');
const { Types } = require('mongoose');

const getSubcategories = catchAsync(async (req, res, next) => {
  const categoryId = req.params.categoryId;
  let subacategories = [];

  if (categoryId) {
    subacategories = await Subcategory.find({ categoryId });
  } else {
    subacategories = await Subcategory.find({});
  }

  return res.status(200).json({
    status: 'success',
    subacategories,
  });
});

const getSubcategory = catchAsync(async (req, res, next) => {
  const subcategoryId = req.params.subcategoryId;

  if (!subcategoryId) {
    return next(new AppError(getCustomLabel(req, MESSAGES.SUBCATEGORY_ID_NOT_SPECIFIED)));
  }

  const subcategory = await Subcategory.findByIdAndUpdate(subcategoryId, req.body, { new: true });

  if (!subcategory) {
    return next(new AppError(Format(getCustomLabel(req, MESSAGES.SUBCATEGORY_NOT_FOUND_FORMAT), subcategoryId), 404));
  }

  res.status(200).json({
    status: 'success',
    subcategory,
  });
});

const updateSubcategory = catchAsync(async (req, res, next) => {
  const subcategoryId = req.params.subcategoryId || req.body.id || req.body._id;

  if (!subcategoryId) {
    return next(new AppError(getCustomLabel(req, MESSAGES.SUBCATEGORY_ID_NOT_SPECIFIED), 400));
  }

  const subcategory = await Subcategory.findByIdAndUpdate(subcategoryId, req.body, { new: true });

  if (!subcategory) {
    return next(new AppError(Format(getCustomLabel(req, MESSAGES.SUBCATEGORY_NOT_FOUND_FORMAT), 404)));
  }

  res.status(200).json({
    status: 'success',
    subcategory,
  });
});

const createSubcategory = catchAsync(async (req, res, next) => {
  const parentCategoryId = req.params?.categoryId || req.body?.categoryId;

  if (!parentCategoryId) {
    return next(new AppError(getCustomLabel(req, MESSAGES.CATEGORY_ID_NOT_SPECIFIED)));
  }

  const parentCategory = await Category.findById(parentCategoryId);

  if (!parentCategory) {
    return next(new AppError(Format(getCustomLabel(req, MESSAGES.CATEGORY_NOT_FOUND_FORMAT), categoryId), 404));
  }

  const subcategory = await Subcategory.create({ ...req.body, categoryId: parentCategoryId });

  return res.status(200).json({
    status: 'success',
    subcategory,
  });
});

const deleteSubcategory = catchAsync(async (req, res, next) => {
  const subcategoryId = req.params.subcategoryId || req.body.id || req.body._id;

  if (!subcategoryId) {
    return next(new AppError(getCustomLabel(req, MESSAGES.SUBCATEGORY_ID_NOT_SPECIFIED), 400));
  }

  await Subcategory.findByIdAndDelete(subcategoryId);

  return res.status(204).end();
});

const getProductsBySubcategory = catchAsync(async (req, res, next) => {
  const subcategoryId = req.params.subcategoryId;

  if (!subcategoryId) {
    return next(new AppError(getCustomLabel(req, MESSAGES.SUBCATEGORY_ID_NOT_SPECIFIED)));
  }

  const query = { subcategoryId: new Types.ObjectId(subcategoryId) };
  const apiFeatures = new APIFeatures(Product.find(query), req.query);

  apiFeatures.filter().sort().paginate().specifyFields();

  const products = await apiFeatures.query;

  return res.status(200).json({ status: 'success', size: products.length, data: products });
});

module.exports = {
  createSubcategory,
  updateSubcategory,
  getSubcategories,
  deleteSubcategory,
  getSubcategory,
  getProductsBySubcategory,
};
