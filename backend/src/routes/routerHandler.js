const { Router } = require('express');
const {
  getUsersRouter,
  getProductsRouter,
  getAuthRouter,
  getCategoriesRouter,
  getSubcategoriesRouter,
  getImgRouter,
} = require('./');
const { getOrdersRouter } = require('./orderRoute');

const getRoutesHandler = () => {
  const router = Router();

  router.use('/api/auth', getAuthRouter());
  router.use('/api/products', getProductsRouter());
  router.use('/api/users', getUsersRouter());
  router.use('/api/categories', getCategoriesRouter());
  router.use('/api/subcategories', getSubcategoriesRouter());
  router.use('/api/orders', getOrdersRouter());

  router.use('/api/img', getImgRouter());

  return router;
};

module.exports = { getRoutesHandler };
