const multer = require('multer');
const { Router } = require('express');
const {
  getAllProducts,
  createProduct,
  updateProduct,
  getProduct,
  deleteProduct,
  uploadProductPhoto,
  resizeAndSave,
} = require('../controllers');

const getProductsRouter = () => {
  const router = Router();

  router.route('/').get(getAllProducts).post(uploadProductPhoto, resizeAndSave, createProduct);

  router.route('/:id').get(getProduct).patch(uploadProductPhoto, resizeAndSave, updateProduct).delete(deleteProduct);

  return router;
};

module.exports = { getProductsRouter };
