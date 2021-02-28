const { Router } = require('express');
const { getOrders, createOrder, updateOrder, deleteOrder, getOrder, protect } = require('../controllers');

const getOrdersRouter = () => {
  const router = Router();

  router.route('/').all(protect).get(getOrders).post(createOrder);

  router.route('/:id').get(getOrder).patch(updateOrder).delete(deleteOrder);

  return router;
};

module.exports = { getOrdersRouter };
