const jwt = require('jsonwebtoken');
const User = require('../models/usersModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const { getCustomLabel, MESSAGES } = require('../labels/index');
const { JWT_EXPIRES_SECONDS, JWT_SECRET } = require('../config');
const isInProd = require('../utils/isInProd');
const { sign } = require('crypto');
const { promisify } = require('util');

const ROLE_USER = 'user';

const register = catchAsync(async (req, res, next) => {
  const user = ({ email, firstName, lastName, password, passwordConfirm } = req.body);

  const { isValid, errors } = await validateRegisteringUser(req, user);

  if (!isValid) {
    return next(new AppError(errors.join(' '), 400));
  }

  const newUser = await User.create({ ...user, role: ROLE_USER });

  signTokenAndSetCookie(user, res);

  return res.status(200).json({
    status: 'success',
    user: filterUser(newUser),
  });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError(getCustomLabel(MESSAGES.PLEASE_ENTER_YOUR_EMAIL_AND_PASSWORD), 401));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.comparePasssword(password, user.password))) {
    return next(new AppError(getCustomLabel(req, MESSAGES.EMAIL_OR_PASSWORD_IS_INCORRECT), 401));
  }

  signTokenAndSetCookie(user, res);

  return res.status(200).json({
    status: 'success',
    user: filterUser(user),
  });
});

const logout = catchAsync(async (req, res, next) => {
  if (req.cookies?.jwt) {
    res.clearCookie('jwt');
  }

  return res.status(200).json({
    status: 'success',
  });
});

const protect = catchAsync(async (req, res, next) => {
  const token = req.cookies?.jwt;

  // 1) check if user is authinticated at all
  if (!token) {
    return next(new AppError(getCustomLabel(req, MESSAGES.PLEASE_LOG_IN_TO_VIEW_THIS_CONTENT, 401)));
  }

  // 2) verify the token (check if it's valid and not expired)
  let decodedToken;

  try {
    decodedToken = await promisify(jwt.verify)(token, JWT_SECRET);
  } catch (error) {
    return next(new AppError(getCustomLabel(req, MESSAGES.PLEASE_LOG_IN_TO_VIEW_THIS_CONTENT, 401)));
  }

  // 3) check if user exists with id passed from jwt
  const user = await User.findById(decodedToken.id);

  if (!user) {
    return next(new AppError(getCustomLabel(req, MESSAGES.PLEASE_LOG_IN_TO_VIEW_THIS_CONTENT, 401)));
  }

  // 4) check if user didn't change the password after the token has been signed
  if (user.hasPasswordChangedAfterJwtExpiry(decodedToken.iat)) {
    return next(new AppError(getCustomLabel(req, MESSAGES.PLEASE_LOG_IN_TO_VIEW_THIS_CONTENT, 401)));
  }

  // grand acces to protected resource
  req.user = user;

  return next();
});

const signTokenAndSetCookie = (user, res) => {
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: JWT_EXPIRES_SECONDS,
  });

  res.cookie('jwt', token, {
    maxAge: JWT_EXPIRES_SECONDS * 1000, // convert to miliseconds,
    httpOnly: false,
    secure: isInProd(),
  });
};

const filterUser = (user) => {
  user.password = user.passwordConfirm = user.role = undefined;

  return user;
};

const validateRegisteringUser = async (req, user) => {
  const res = {
    errors: [],
    isValid: true,
  };
  const [fetchedUser] = await User.find({ email });

  if (fetchedUser) {
    res.errors.push(getCustomLabel(req, MESSAGES.USER_WITH_THIS_EMAIL_ALREADY_EXISTS));
    res.isValid = false;

    return res;
  }

  if (!user.firstName || user.firstName.length === 0) {
    res.errors.push(getCustomLabel(req, MESSAGES.PLEASE_ENTER_YOUR_FIRST_NAME));
    res.isValid = false;
  }

  if (!user.lastName || user.lastName.length === 0) {
    res.errors.push(getCustomLabel(req, MESSAGES.PLEASE_ENTER_YOUR_LAST_NAME));
    res.isValid = false;
  }

  if (!user.email || user.email.length === 0) {
    res.errors.push(getCustomLabel(req, MESSAGES.PLEASE_ENTER_YOUR_EMAIL));
    res.isValid = false;
  }

  if (!user.password || user.password.length === 0) {
    res.errors.push(getCustomLabel(req, MESSAGES.PLEASE_ENTER_YOUR_PASSWORD));
    res.isValid = false;
  }

  if (!user.passwordConfirm || user.passwordConfirm.length === 0) {
    res.errors.push(getCustomLabel(req, MESSAGES.PLEASE_ENTER_YOUR_PASSWORD_CONFIRM));
    res.isValid = false;
  }

  if (user.password != user.passwordConfirm) {
    res.errors.push(getCustomLabel(req, MESSAGES.PLEASE_CHECK_YOUR_PASSWORD_CONFIRM));
    res.isValid = false;
  }

  return res;
};

module.exports = {
  register,
  login,
  logout,
  protect,
};
