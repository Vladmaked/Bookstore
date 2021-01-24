const { Router } = require('express');
const { updateSubcategory, getSubcategories, createSubcategory, deleteSubcategory } = require('../controllers');

const getSubcategoriesRouter = () => {
  const router = Router({ mergeParams: true });

  router.route('/:subcategoryId').patch(updateSubcategory).delete(deleteSubcategory);

  router.route('/').get(getSubcategories).post(createSubcategory);

  return router;
};

module.exports = { getSubcategoriesRouter };
