const { getUsersRouter } = require('./usersRoute');
const { getProductsRouter } = require('./productsRoute');
const { getAuthRouter } = require('./authRoute');
const { getCategoriesRouter } = require('./categoriesRoute');
const { getSubcategoriesRouter } = require('./subcategoriesRoute');
const { getImgRouter } = require('./imgRoute');

module.exports = {
  getUsersRouter,
  getProductsRouter,
  getAuthRouter,
  getCategoriesRouter,
  getSubcategoriesRouter,
  getImgRouter,
};
