const { getUsersRouter } = require('./usersRoute');
const { getProductsRouter } = require('./productsRoute');
const { getAuthRoute } = require('./authRoute');

module.exports = {
  getUsersRouter,
  getProductsRouter,
  getAuthRoute,
};
