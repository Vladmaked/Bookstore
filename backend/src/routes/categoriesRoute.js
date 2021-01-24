const { Router } = require('express');
const { getCategoriesTree, createCategory, createSubcategory, updateCategory } = require('../controllers');
const { getSubcategoriesRouter } = require('./subcategoriesRoute');

const getCategoriesRouter = () => {
  const router = Router();

  const subCategoriesRouter = getSubcategoriesRouter();

  router.route('/').get(getCategoriesTree).post(createCategory);

  router.route('/:categoryId').patch(updateCategory);

  router.route('/:categoryId/subcategories').post(createSubcategory);

  router.use('/:categoryId/subcategories', subCategoriesRouter);

  return router;
};

module.exports = { getCategoriesRouter };
