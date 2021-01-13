const productsController = require('./productsController.js');

const usersController = require('./usersController.js');

module.exports = {
  ...productsController,
  ...usersController,
};
