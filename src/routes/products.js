const express = require('express')
const router = express.Router()
const productController = require('../controller/products')
const upload = require('../middleware/upload')
const {hitCacheProductDetail,clearCacheProductDetail} = require('../middleware/redis')
const { protect, validateSeller } = require('../middleware/auth')

router
  .get('/', protect, productController.getAllProduct)
  .get('/:product_id', protect,hitCacheProductDetail, productController.getDetailProduct)
  .post('/', protect,  validateSeller,upload.single('image'), productController.createProduct)
  .put('/:product_id', protect, clearCacheProductDetail, validateSeller,upload.single('image'), productController.updateProduct)
  .delete('/:product_id', protect,clearCacheProductDetail, validateSeller, productController.deleteProduct)

module.exports = router
