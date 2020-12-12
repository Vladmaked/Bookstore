import {NextFunction, Request, RequestHandler, Response} from 'express';

export default (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next);
    // .catch(next);
  };
};
