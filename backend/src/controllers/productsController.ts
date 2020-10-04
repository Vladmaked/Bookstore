import { Request, Response, NextFunction } from 'express';

import Product from '../models/productsModel';
import catchAsync from '../utils/catchAsync';
import { AppError } from '../utils/AppError';
import { getCustomLabel, USER_MESSAGES } from '../labels';

export const getAllProducts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const products = await Product.find({});

  res.status(200).json({ status: 'success', data: products });
});

export const getProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const product = await Product.findById(req.params.id);

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
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ status: 'success', data: product });
});

export const deleteProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    // handle
  }

  res.status(204).json({
    status: 'success',
    data: product,
  });
});
