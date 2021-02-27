const { Router } = require('express');
const { getImage } = require('../controllers');

const getImgRouter = () => {
  const router = Router();

  router.route('/:fileName').get(getImage);

  return router;
};

module.exports = { getImgRouter };
