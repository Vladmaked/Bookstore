const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/ApiFeatures');
const { getCustomLabel, MESSAGES } = require('../labels/index');
const { DEFAULT_PAGE_SIZE } = require('../config');

const { Mongoose, Types } = require('mongoose');

const Order = require('../models/orderModel');
const AppError = require('../utils/AppError');
const Format = require('string-format');

const getOrders = catchAsync(async (req, res, next) => {
  const apiFeatures = new APIFeatures(Order.find({}), req.query);

  const page = +req.query.page || 1;
  const limit = +req.query.limit || DEFAULT_PAGE_SIZE;

  apiFeatures.filter().sort().specifyFields();

  const orders = await Order.paginate(apiFeatures.query, { page, limit });

  return res.status(200).json({ status: 'success', data: orders });
});

const getOrder = catchAsync(async (req, res, next) => {
  const orderId = req.params.id || req.body.id || req.body._id;

  const apiFeatures = new APIFeatures(Order.findById(orderId), req.query);

  apiFeatures.specifyFields();

  const order = await apiFeatures.query;

  if (!order) {
    return next(new AppError(Format(getCustomLabel(req, MESSAGES.ORDER_NOT_FOUND_FORMAT), orderId), 404));
  }

  return res.status(200).json({ status: 'success', data: order });
});

const createOrder = catchAsync(async (req, res, next) => {
  const customerId = req.user?.id;

  if (!customerId) {
    return next(new AppError(getCustomLabel(req, MESSAGES.LOGIN_TO_MAKE_ORDERS), 403));
  }

  const orderObj = {
    ...req.body,
    customerId,
  };

  const order = await Order.create(orderObj);

  return res.status(200).json({ status: 'success', data: order });
});

const updateOrder = catchAsync(async (req, res, next) => {
  const orderId = req.params.id || req.body.id || req.body._id;
  const customerId = req.user.id;

  const orderObj = {
    ...req.body,
    customerId,
  };

  const order = await Order.create(orderObj);

  if (!orderId || !order) {
    return next(new AppError(Format(getCustomLabel(req, MESSAGES.ORDER_NOT_FOUND_FORMAT), orderId), 404));
  }

  return res.status(200).json({ status: 'success', data: order });
});

const deleteOrder = catchAsync(async (req, res, next) => {
  const orderId = req.params.id || req.body.id || req.body._id;

  const order = await Order.findByIdAndDelete(req.params.id);

  if (!orderId || !order) {
    return next(new AppError(Format(getCustomLabel(req, MESSAGES.ORDER_NOT_FOUND_FORMAT), orderId), 404));
  }

  return res.status(204).json({
    status: 'success',
    data: order,
  });
});

module.exports = {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
};
