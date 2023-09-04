const express = require('express')
const router = express.Router()
const productController = require('../controller/products')
const uploadProduct = require("../middleware/uploadProduct");
// const {hitCacheProductDetail,clearCacheProductDetail} = require('../middleware/redis')
const { protect, validateSeller } = require('../middleware/auth')

router
  .get('/',  productController.getAllProduct)
  .get('/:product_id', productController.getDetailProduct)
  .get("/seller/:id_seller", productController.getProductSeller)
  .post('/',uploadProduct, productController.createProduct)
  .put('/:product_id',uploadProduct, productController.updateProduct)
  .delete('/:product_id',productController.deleteProduct)

module.exports = router
