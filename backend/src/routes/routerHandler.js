const { Router } = require('express');
const { getUsersRouter, getProductsRouter } = require('./');

const getRoutesHandler = () => {
  const router = Router();

  router.use('/api/products', getProductsRouter());

  router.use('/api/users', getUsersRouter());

  return router;
};

module.exports = { getRoutesHandler };
