import { Request, Response, NextFunction } from 'express';

import User from '../models/usersModel';
import catchAsync from '../utils/catchAsync';
import { AppError } from '../utils/AppError';
import { getCustomLabel, USER_MESSAGES } from '../labels';
import APIFeatures from '../utils/ApiFeatures';
import { stringify } from 'querystring';
import Format from 'string-format';

export const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const apiFeatures = new APIFeatures(User.find({}), req.query);
  apiFeatures.filter().sort().paginate().specifyFields();

  const users = await apiFeatures.query;

  res.status(200).json({ status: 'success', data: users });
});

export const getUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const apiFeatures = new APIFeatures(User.findById(req.query.id), req.query);
  apiFeatures.specifyFields();

  const user = await apiFeatures.query;

  res.status(200).json({ status: 'success', data: user });
});

export const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const user = await User.create(req.body);

  res.status(200).json({ status: 'success', data: user });
});

export const updateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.id || req.body.id || req.body._id;

  const user = await User.findByIdAndUpdate(userId, req.body);

  if (!userId || !user) {
    return next(new AppError(Format(getCustomLabel(req, USER_MESSAGES.USER_WITH_ID_NOT_FOUND_FORMAT), userId), 404));
  }

  res.status(200).json({ status: 'success', data: user });
});

export const deleteUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.id || req.body.id || req.body._id;

  const user = await User.findByIdAndDelete(userId);

  if (!userId || !user) {
    return next(new AppError(Format(getCustomLabel(req, USER_MESSAGES.USER_WITH_ID_NOT_FOUND_FORMAT), userId), 404));
  }

  res.status(204).json({ status: 'success', data: null });
});
