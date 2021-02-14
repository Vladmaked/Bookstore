const multer = require('multer');
const { Router } = require('express');
const {
  getAllProducts,
  createProduct,
  updateProduct,
  getProduct,
  deleteProduct,
  uploadProductPhoto,
} = require('../controllers');

const getProductsRouter = () => {
  const router = Router();

  router.route('/').get(getAllProducts).post(createProduct);

  router.route('/:id').get(getProduct).patch(uploadProductPhoto, updateProduct).delete(deleteProduct);

  return router;
};

module.exports = { getProductsRouter };
