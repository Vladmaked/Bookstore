import express from 'express';
import {handleError} from './controllers/errorController';
import {getRoutesHandler} from './routes';

export const createApp = () => {
  const app = express();

  // to be able to read passed data from req.body as a JS object
  app.use(express.json());

  // global routes handler
  app.use(getRoutesHandler());

  // global error handler
  app.use(handleError);

  return app;
};
