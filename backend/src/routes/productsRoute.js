const { Router } = require('express');
const { getAllProducts, createProduct, updateProduct, getProduct, deleteProduct, protect } = require('../controllers');

const getProductsRouter = () => {
  const router = Router();

  router.route('/').get(protect, getAllProducts).post(createProduct);

  router.route('/:id').get(getProduct).patch(updateProduct).delete(deleteProduct);

  return router;
};

module.exports = { getProductsRouter };
