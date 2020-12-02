import { Request, Response, NextFunction } from 'express';

import Product from '../models/productsModel';
import catchAsync from '../utils/catchAsync';
import { AppError } from '../utils/AppError';
import { getCustomLabel, USER_MESSAGES } from '../labels';
import APIFeatures from '../utils/ApiFeatures';
import Format from 'string-format';

export const getAllProducts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const apiFeatures = new APIFeatures(Product.find({}), req.query);

  apiFeatures.filter().sort().paginate().specifyFields();

  const products = await apiFeatures.query;

  res.status(200).json({ status: 'success', data: products });
});

export const getProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const apiFeatures = new APIFeatures(Product.findById(req.params.id), req.query);

  apiFeatures.specifyFields();

  const product = await apiFeatures.query;

  if (!product) {
    return next(new AppError(getCustomLabel(req, USER_MESSAGES.PRODUCT_NOT_FOUND), 404));
  }

  res.status(200).json({ status: 'success', data: product });
});

export const createProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const product = await Product.create(req.body);

  res.status(201).json({ status: 'success', data: product });
});

export const updateProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const productId = req.params.id || req.body.id || req.body._id;

  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!productId || !product) {
    return next(
      new AppError(Format(getCustomLabel(req, USER_MESSAGES.PRODUCT_WITH_ID_NOT_FOUND_FORMAT), productId), 404)
    );
  }

  res.status(200).json({ status: 'success', data: product });
});

export const deleteProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const productId = req.params.id || req.body.id || req.body._id;

  const product = await Product.findByIdAndDelete(req.params.id);

  if (!productId || !product) {
    return next(
      new AppError(Format(getCustomLabel(req, USER_MESSAGES.PRODUCT_WITH_ID_NOT_FOUND_FORMAT), productId), 404)
    );
  }

  res.status(204).json({
    status: 'success',
    data: product,
  });
});
