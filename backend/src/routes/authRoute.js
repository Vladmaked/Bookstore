const { Router } = require('express');
const { register, login, logout } = require('../controllers');

const getAuthRouter = () => {
  const router = Router();

  router.post('/register', register);

  router.post('/login', login);

  router.post('/logout', logout);

  return router;
};

module.exports = { getAuthRouter };
