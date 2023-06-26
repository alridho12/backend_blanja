const express = require('express')
const router = express.Router()
const userController = require('../controller/users')
const { protect, validateAdmin } = require('../middleware/auth')

router
  .post('/register', userController.registerUser)
  .post('/login', userController.loginUser)
  .get('/profile', protect, userController.profile)
  .post('/refreshToken', userController.refreshToken)
  .get('/', protect, validateAdmin, userController.selectAllUsers)

module.exports = router
