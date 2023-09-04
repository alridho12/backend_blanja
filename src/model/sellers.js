const pool = require('../config/db')

const create = (data) => {
    const { store_name, email, passwordHash, role, id } = data
    return pool.query(
        `INSERT INTO sellers(id_seller,email,password,store_name,role) VALUES('${id}','${email}','${passwordHash}','${store_name}','${role}')`
    )
}

const updateSeller = (data) => {
    const { id, store_name, phone_number, store_description, photo_profile } = data;
    return pool.query(
        `UPDATE sellers SET store_name='${store_name}',phone_number='${phone_number}',store_description='${store_description}', photo_profile='${photo_profile}'  WHERE id_seller='${id}'`
    );
};

const findEmail = (email) => {
    return new Promise((resolve, reject) =>
        pool.query(
            `SELECT * FROM sellers WHERE email = '${email}'`,
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
            `SELECT id_seller FROM sellers WHERE id_seller='${id}'`,
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

const selectSeller = (id) => {
    return pool.query(`SELECT * FROM sellers WHERE id_seller='${id}'`);
  };


const selectAllSellers = () => {
    return pool.query('SELECT * FROM sellers')
}

module.exports = {
    findEmail,
    findId,
    create,
    selectAllSellers,
    selectSeller,
    updateSeller
}
