import { Application, Router } from 'express';
import { getProductsRouter, getUsersRouter } from './';

export const getRoutesHandler: any = () => {
  const router: Router = Router();

  router.use('/api/products', getProductsRouter());

  router.use('/api/users', getUsersRouter());

  return router;
};
