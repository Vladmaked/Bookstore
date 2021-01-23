const { Router } = require('express');
const { getUsersRouter, getProductsRouter, getAuthRouter, getCategoriesRouter, getSubcategoriesRouter } = require('./');

const getRoutesHandler = () => {
  const router = Router();

  router.use('/api/auth', getAuthRouter());

  router.use('/api/products', getProductsRouter());

  router.use('/api/users', getUsersRouter());

  router.use('/api/categories', getCategoriesRouter());

  router.use('/api/subcategories', getSubcategoriesRouter());

  return router;
};

module.exports = { getRoutesHandler };
