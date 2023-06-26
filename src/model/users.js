const pool = require('../config/db')

const create = (data) => {
  const { fullname, email, passwordHash, role, id } = data
  return pool.query(
    `INSERT INTO users(id,email,password,fullname,role) VALUES('${id}','${email}','${passwordHash}','${fullname}','${role}')`
  )
}

const findEmail = (email) => {
  return new Promise((resolve, reject) =>
    pool.query(
      `SELECT * FROM users WHERE email = '${email}'`,
      (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(error)
        }
      }
    )
  )
}

const selectAllUsers = () => {
  return pool.query('SELECT * FROM users')
}

module.exports = {
  findEmail,
  create,
  selectAllUsers
}
