import { Router } from 'express';
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from '../controllers';

export const getUsersRouter = (): Router => {
  const router = Router();

  router.route('/').get(getAllUsers).post(createUser);

  router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

  return router;
};
