import { Router } from 'express';
import {
  getAllProducts,
  createProduct,
  updateProduct,
  getProduct,
  deleteProduct,
} from '../controllers/productsController';

export const getProductsRouter = () => {
  const router = Router();

  router.route('/').get(getAllProducts).post(createProduct);

  router.route('/:id').get(getProduct).patch(updateProduct).delete(deleteProduct);

  return router;
};
