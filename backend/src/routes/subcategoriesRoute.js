const { Router } = require('express');
const {
  updateSubcategory,
  getSubcategories,
  createSubcategory,
  deleteSubcategory,
  getSubcategory,
} = require('../controllers');

const getSubcategoriesRouter = () => {
  const router = Router({ mergeParams: true });

  router.route('/:subcategoryId').patch(updateSubcategory).delete(deleteSubcategory).get(getSubcategory);

  router.route('/').get(getSubcategories).post(createSubcategory);

  return router;
};

module.exports = { getSubcategoriesRouter };
