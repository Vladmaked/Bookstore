const { Router } = require('express');
const { getCategoriesTree, createCategory, createSubcategory, updateCategory } = require('../controllers');

const getCategoriesRouter = () => {
  const router = Router();

  router.route('/').get(getCategoriesTree).post(createCategory);

  router.route('/:id').patch(updateCategory);

  router.route('/:id/subcategories').post(createSubcategory);

  return router;
};

module.exports = { getCategoriesRouter };
