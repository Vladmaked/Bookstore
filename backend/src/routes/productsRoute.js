const { Router } = require('express');
const { getAllProducts, createProduct, updateProduct, getProduct, deleteProduct } = require('../controllers');

const getProductsRouter = () => {
  const router = Router();

  router.route('/').get(getAllProducts).post(createProduct);

  router.route('/:id').get(getProduct).patch(updateProduct).delete(deleteProduct);

  return router;
};

module.exports = { getProductsRouter };
