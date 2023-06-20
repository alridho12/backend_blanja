const express = require('express')
const router = express.Router()
const productRouter = require('../routes/products')
const categoryRouter = require('../routes/categories')
const ordersRouter = require('../routes/orders')
router.use('/products', productRouter)
router.use('/categories', categoryRouter)
router.use('/orders', ordersRouter)

module.exports = router
