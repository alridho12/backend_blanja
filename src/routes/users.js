const express = require('express')
const router = express.Router()
const userController = require('../controller/users')
const uploadProfile = require("../middleware/uploadProfile");
// const { protect, validateAdmin } = require('../middleware/auth')

router
  .post('/register', userController.registerUser)
  .post('/login', userController.loginUser)
  .put('/:id',uploadProfile, userController.updateUser)
  .get('/profile', userController.profile)
  .post('/refreshToken', userController.refreshToken)
  .get('/:id', userController.getDetailUser)
  // .get('/', protect, validateAdmin, userController.selectAllUsers)

module.exports = router
