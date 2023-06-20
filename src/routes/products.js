const express = require('express')
const router = express.Router()
const productController = require('../controller/products')

router
  .get('/', productController.getAllProduct)
  .get('/:product_id', productController.getDetailProduct)
  .post('/', productController.createProduct)
  .put('/:product_id', productController.updateProduct)
  .delete('/:product_id', productController.deleteProduct)

module.exports = router
