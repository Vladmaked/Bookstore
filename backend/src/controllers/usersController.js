const User = require('../models/usersModel.js');
const catchAsync = require('../utils/catchAsync.js');
const { AppError } = require('../utils/AppError.js');
const { getCustomLabel, USER_MESSAGES } = require('../labels/index.js');
const APIFeatures = require('../utils/ApiFeatures.js');
const Format = require('string-format');

const getAllUsers = catchAsync(async (req, res, next) => {
  const apiFeatures = new APIFeatures(User.find({}), req.query);
  apiFeatures.filter().sort().paginate().specifyFields();

  const users = await apiFeatures.query;

  res.status(200).json({ status: 'success', data: users });
});

const getUser = catchAsync(async (req, res, next) => {
  const apiFeatures = new APIFeatures(User.findById(req.query.id), req.query);
  apiFeatures.specifyFields();

  const user = await apiFeatures.query;

  res.status(200).json({ status: 'success', data: user });
});

const createUser = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(200).json({ status: 'success', data: user });
});

const updateUser = catchAsync(async (req, res, next) => {
  const userId = req.params.id || req.body.id || req.body._id;

  const user = await User.findByIdAndUpdate(userId, req.body);

  if (!userId || !user) {
    return next(new AppError(Format(getCustomLabel(req, USER_MESSAGES.USER_WITH_ID_NOT_FOUND_FORMAT), userId), 404));
  }

  const retrievedUser = await User.findById(user.id);

  res.status(200).json({ status: 'success', data: retrievedUser });
});

const deleteUser = catchAsync(async (req, res, next) => {
  const userId = req.params.id || req.body.id || req.body._id;

  const user = await User.findByIdAndDelete(userId);

  if (!userId || !user) {
    return next(new AppError(Format(getCustomLabel(req, USER_MESSAGES.USER_WITH_ID_NOT_FOUND_FORMAT), userId), 404));
  }

  res.status(204).json({ status: 'success', data: null });
});

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
