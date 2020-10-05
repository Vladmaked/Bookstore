import { Router } from 'express';
import { getAllProducts, createProduct, updateProduct, getProduct, deleteProduct } from '../controllers';

export const getProductsRouter = (): Router => {
  const router = Router();

  router.route('/').get(getAllProducts).post(createProduct);

  router.route('/:id').get(getProduct).patch(updateProduct).delete(deleteProduct);

  return router;
};
