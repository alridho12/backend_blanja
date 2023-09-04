const pool = require('../config/db')

const create = (data) => {
  const { fullname, email, passwordHash, role, id } = data
  return pool.query(
    `INSERT INTO users(id_customer,email,password,fullname,role) VALUES('${id}','${email}','${passwordHash}','${fullname}','${role}')`
  )
}

const updateUsers = (data) => {
  const { id, fullname,phone_number,gender,birth,photo_profile } = data;
  return pool.query(
    `UPDATE users SET fullname='${fullname}',phone_number='${phone_number}',gender='${gender}',birth='${birth}', photo_profile='${photo_profile}'  WHERE id_customer='${id}'`
  );
};


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

const findId = (id) => {
  return new Promise((resolve, reject) =>
    pool.query(
      `SELECT id_customer FROM users WHERE id_customer='${id}'`,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    )
  );
};

const selectUser = (id) => {
  return pool.query(`SELECT * FROM users WHERE id_customer='${id}'`);
};

const selectAllUsers = () => {
  return pool.query('SELECT * FROM users')
}

module.exports = {
  findEmail,
  create,
  updateUsers,
  findId,
  selectAllUsers,
  selectUser
}
