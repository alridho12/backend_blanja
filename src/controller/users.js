const { findEmail, create, selectAllUsers,findId,updateUsers,selectUser } = require('../model/users')
const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken')
const authHelper = require('../helper/auth')
const commonHelper = require('../helper/common')
const cloudinary = require("../middleware/cloudinary");


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
      return res.json({ message: 'password is incorrect' })
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
  },
  updateUser: async (req, res) => {
    const id = req.params.id;
    const {
      fullname,
      phone_number,
      gender,
      birth,
    } = req.body;

    try {
      const { rowCount } = await findId(id);
      if (!rowCount) return res.json({ message: "User Not Found!" });

      let photo_profile = null;
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        photo_profile = result.secure_url;
      }

      const data = {
        id,
        fullname,
        phone_number,
        gender,
        birth,
        photo_profile
      };

      const result = await updateUsers(data);
      commonHelper.response(res, result.rows, 200, 'Profile updated successfully');
    } catch (err) {
      console.log(err);
      commonHelper.response(res, null, 500, 'Error while updating worker data');
    }
  },
  getDetailUser: async (req, res) => {
    const id = req.params.id;
    const { rowCount } = await findId(id);
    if (!rowCount) {
      return res.json({ message: "ID is Not Found" })
    }
    selectUser(id)
      .then((result) => {
        commonHelper.response(res, result.rows, 200, "get data success");
      })
      .catch((err) => res.send(err));
  },
}

module.exports = userController
