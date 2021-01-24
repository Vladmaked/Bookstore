const { Router } = require('express');
const { updateSubcategory, getSubcategories, createSubcategory } = require('../controllers');

const getSubcategoriesRouter = () => {
  const router = Router({ mergeParams: true });

  router.route('/:subcategoryId').patch(updateSubcategory);

  router.route('/').get(getSubcategories).post(createSubcategory);

  return router;
};

module.exports = { getSubcategoriesRouter };
