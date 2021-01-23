const productsController = require('./productsController');
const usersController = require('./usersController');
const authController = require('./authController');

module.exports = {
  ...productsController,
  ...usersController,
  ...authController,
};
