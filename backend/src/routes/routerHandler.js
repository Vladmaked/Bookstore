const { Router } = require('express');
const { getUsersRouter, getProductsRouter, getAuthRoute } = require('./');

const getRoutesHandler = () => {
  const router = Router();

  router.use('/api/products', getProductsRouter());

  router.use('/api/users', getUsersRouter());

  router.use('/api/auth', getAuthRoute());

  return router;
};

module.exports = { getRoutesHandler };
