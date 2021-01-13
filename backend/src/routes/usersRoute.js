const { Router } = require('express');
const { createUser, deleteUser, getAllUsers, getUser, updateUser } = require('../controllers');

const getUsersRouter = () => {
  const router = Router();

  router.route('/').get(getAllUsers).post(createUser);

  router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

  return router;
};

module.exports = { getUsersRouter };
