const { Error } = require('mongoose');
const isInProd = require('./isInProd');

module.exports = class AppError extends (
  Error
) {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'failed' : 'error';
    this.isOperational = false;

    // if (!isInProd()) Error.captureStackTrace(this, this.constructor);
  }
};
