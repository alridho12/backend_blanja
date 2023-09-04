const express = require('express')
const router = express.Router()
const sellersController = require('../controller/sellers')
const uploadProfileSeller = require("../middleware/uploadProfileSeller");
const { protect, validateAdmin } = require('../middleware/auth')

router
  .post('/register', sellersController.registerSellers)
  .post('/login', sellersController.loginSellers)
  .put('/:id',uploadProfileSeller, sellersController.updateUser)
  .get('/profile', sellersController.profile)
  .post('/refreshToken', sellersController.refreshToken)
  .get('/:id', sellersController.getDetailUser)
//   .get('/', protect, validateAdmin, userController.selectAllUsers)

module.exports = router
