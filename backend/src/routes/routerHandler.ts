import { Application, Router } from 'express';
import { getProductsRouter } from './';

export const getRoutesHandler: any = () => {
  const router: Router = Router();

  router.use('/api/products', getProductsRouter());

  return router;
};
