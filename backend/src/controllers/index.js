const productsController = require('./productsController');
const usersController = require('./usersController');
const authController = require('./authController');
const categoriesController = require('./categoriesController');

module.exports = {
  ...productsController,
  ...usersController,
  ...authController,
  ...categoriesController,
};
