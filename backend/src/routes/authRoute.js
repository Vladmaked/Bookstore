const { Router } = require('express');
const { register, login, logout } = require('../controllers');

const getAuthRoute = () => {
  const router = Router();

  router.post('/register', register);

  router.post('/login', login);

  router.post('/logout', logout);

  return router;
};

module.exports = { getAuthRoute };
