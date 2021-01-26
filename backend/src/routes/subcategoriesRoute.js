const { Router } = require('express');
const {
  updateSubcategory,
  getSubcategories,
  createSubcategory,
  deleteSubcategory,
  getSubcategory,
  getProductsBySubcategory,
} = require('../controllers');

const getSubcategoriesRouter = () => {
  const router = Router({ mergeParams: true });

  router.route('/:subcategoryId').patch(updateSubcategory).delete(deleteSubcategory).get(getSubcategory);

  router.route('/').get(getSubcategories).post(createSubcategory);

  router.route('/:subcategoryId/products').get(getProductsBySubcategory);

  return router;
};

module.exports = { getSubcategoriesRouter };
