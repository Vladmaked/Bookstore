const express = require('express');
const { handleError } = require('./controllers/errorController');
const { getRoutesHandler } = require('./routes/routerHandler');

const createApp = () => {
  const app = express();

  // to be able to read passed data from req.body as a JS object
  app.use(express.json());

  // global routes handler
  app.use(getRoutesHandler());

  // global error handler
  app.use(handleError);

  return app;
};

module.exports = { createApp };
