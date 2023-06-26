const { findEmail, create, selectAllUsers } = require('../model/users')
const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken')
const authHelper = require('../helper/auth')
const commonHelper = require('../helper/common')

const userController = {
  registerUser: async (req, res) => {
    const { fullname, email, password, role } = req.body
    const { rowCount } = await findEmail(email)
    if (rowCount) {
      return res.json({ message: 'email is already taken' })
    }
    const passwordHash = bcrypt.hashSync(password)
    const id = uuidv4()
    const data = {
      id,
      email,
      passwordHash,
      fullname,
      role
    }
    create(data)
      .then((result) => {
        commonHelper.response(res, result.rows, 200, 'email is created')
      })
      .catch((err) => {
        console.log(err)
      })
  },
  loginUser: async (req, res) => {
    const { email, password } = req.body
    const {
      rows: [user]
    } = await findEmail(email)
    if (!user) {
      return res.json({ message: 'email is incorrect' })
    }
    const isValidPassword = bcrypt.compareSync(password, user.password)
    if (!isValidPassword) {
      return res.json({ message: 'passowrd is incorrect' })
    }
    delete user.password
    const payload = {
      email: user.email,
      role: user.role
    }
    user.token = authHelper.generateToken(payload)
    user.refreshToken = authHelper.refreshToken(payload)
    commonHelper.response(res, user, 201, 'login is successful')
  },
  profile: async (req, res) => {
    const email = req.payload.email
    const {
      rows: [user]
    } = await findEmail(email)
    delete user.password
    commonHelper.response(res, user, 200)
  },
  refreshToken: (req, res) => {
    const refreshToken = req.body.refreshToken
    const decoded = jwt.verify(refreshToken, process.env.SECRETE_KEY_JWT)
    const payload = {
      email: decoded.email,
      role: decoded.role
    }
    const result = {
      token: authHelper.generateToken(payload),
      refershToken: authHelper.refreshToken(payload)
    }
    commonHelper.response(res, result, 200, 'token is already generate')
  },
  selectAllUsers: async (req, res) => {
    try {
      const users = await selectAllUsers()
      commonHelper.response(res, users.rows, 200, 'Get all users success')
    } catch (err) {
      console.log(err)
      commonHelper.response(res, null, 500, 'Internal server error')
    }
  }
}

module.exports = userController
