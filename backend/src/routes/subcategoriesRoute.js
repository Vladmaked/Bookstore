const { Router } = require('express');
const { updateSubcategory } = require('../controllers');

const getSubcategoriesRouter = () => {
  const router = Router();

  router.route('/:id').patch(updateSubcategory);

  return router;
};

module.exports = { getSubcategoriesRouter };
