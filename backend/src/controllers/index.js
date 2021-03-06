const productsController = require('./productsController');
const usersController = require('./usersController');
const authController = require('./authController');
const categoriesController = require('./categoriesController');
const subcategoriesContorller = require('./subcategoriesContorller');
const imgController = require('./imgController');
const orderController = require('./ordersController');

module.exports = {
  ...productsController,
  ...usersController,
  ...authController,
  ...categoriesController,
  ...subcategoriesContorller,
  ...imgController,
  ...orderController,
};
