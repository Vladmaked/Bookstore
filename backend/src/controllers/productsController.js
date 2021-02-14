const Product = require('../models/productsModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const { getCustomLabel, MESSAGES } = require('../labels/index');
const APIFeatures = require('../utils/ApiFeatures');
const Format = require('string-format');
const multer = require('multer');
const uuid = require('uuid');

const DEFAULT_PAGE_SIZE = 1000;
const PHOTOS_PATH = './data/img/products';

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, PHOTOS_PATH);
  },
  filename: function (req, file, cb) {
    cb(null, `${uuid.v4()}.${file.mimetype.split('/')[1]}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an Image', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const uploadProductPhoto = upload.single('photo');

const getAllProducts = catchAsync(async (req, res, next) => {
  const apiFeatures = new APIFeatures(Product.find({}), req.query);

  const page = +req.query.page || 1;
  const limit = +req.query.limit || DEFAULT_PAGE_SIZE;

  apiFeatures.filter().sort().specifyFields();

  const products = await Product.paginate(apiFeatures.query, { page, limit });

  return res.status(200).json({ status: 'success', data: products });
});

const getProduct = catchAsync(async (req, res, next) => {
  const apiFeatures = new APIFeatures(Product.findById(req.params.id), req.query);

  apiFeatures.specifyFields();

  const product = await apiFeatures.query;

  if (!product) {
    return next(new AppError(getCustomLabel(req, MESSAGES.PRODUCT_NOT_FOUND), 404));
  }

  return res.status(200).json({ status: 'success', data: product });
});

const createProduct = catchAsync(async (req, res, next) => {
  const product = await Product.create(req.body);

  return res.status(201).json({ status: 'success', data: product });
});

const updateProduct = catchAsync(async (req, res, next) => {
  const productId = req.params.id || req.body.id || req.body._id;

  const productObj = {
    ...req.body,
    photo: req.file.filename,
  };

  const product = await Product.findByIdAndUpdate(req.params.id, productObj, {
    new: true,
    runValidators: true,
  });

  if (!productId || !product) {
    return next(new AppError(Format(getCustomLabel(req, MESSAGES.PRODUCT_WITH_ID_NOT_FOUND_FORMAT), productId), 404));
  }

  return res.status(200).json({ status: 'success', data: product });
});

const deleteProduct = catchAsync(async (req, res, next) => {
  const productId = req.params.id || req.body.id || req.body._id;

  const product = await Product.findByIdAndDelete(req.params.id);

  if (!productId || !product) {
    return next(new AppError(Format(getCustomLabel(req, MESSAGES.PRODUCT_WITH_ID_NOT_FOUND_FORMAT), productId), 404));
  }

  return res.status(204).json({
    status: 'success',
    data: product,
  });
});

module.exports = {
  getProduct,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductPhoto,
};
