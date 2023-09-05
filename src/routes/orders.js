const express = require('express')
const router = express.Router()
const ordersController = require('../controller/orders')

router
  .get('/', ordersController.getAllOrder)
  .get('/users/:id_customer', ordersController.getDetailOrder)
  .post('/', ordersController.createOrder)
  .put('/:order_id', ordersController.updateOrder)
  .delete('/:id_order', ordersController.deleteOrder)

module.exports = router
