const pool = require('../config/db')

// const selectAllAddres = (limit, offset, sortby, sort) => {
//     return pool.query(`SELECT * FROM skill_worker ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
// }

// const searchSkills = (search, limit, offset, sortby, sort) => {
//     return pool.query(
//       `SELECT * FROM skill_worker WHERE skill_worker ILIKE '%${search}%' ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`
//     )
//   }

const showAddressByUserId = (id) => {
    return pool.query(`SELECT * FROM address WHERE id_customer = '${id}'`);
}

const selectAddress = (id) => {
    return pool.query(`SELECT * FROM address WHERE id_address ='${id}'`);
}

const insertAddress = (data) => {
    const { id, address_as, recepient_name,address, city_district, recepient_telephone, postal_code, id_customer } = data;
    return pool.query
        (`INSERT INTO address (id_address,address_as,recepient_name,address,city_district,recepient_telephone,postal_code,id_customer) VALUES
     ('${id}','${address_as}','${recepient_name}','${address}','${city_district}','${recepient_telephone}','${postal_code}','${id_customer}')`);
}

const updateAddress = (data) => {
    const { id, address_as, recepient_name,address, city_district, recepient_telephone, postal_code, id_customer } = data;
    return pool.query(`UPDATE address SET address_as ='${address_as}',recepient_name ='${recepient_name}',address = '${address}',city_district = '${city_district}',recepient_telephone = '${recepient_telephone}',postal_code = '${postal_code}',id_customer = '${id_customer}' WHERE id_address='${id}'`);
}

const deleteAddress = (id) => {
    return pool.query(`DELETE FROM address WHERE id_address='${id}'`);
}

const countData = () => {
    return pool.query('SELECT COUNT(*) address')
}

const findId = (id) => {
    return new Promise((resolve, reject) =>
        pool.query(`SELECT id_address FROM address WHERE id_address='${id}'`, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    )
}

// const findName = (skill_name, worker_id) => {
//     return new Promise((resolve, reject) =>
//         pool.query(`SELECT skill_name FROM skill_worker where worker_id='${worker_id}' and skill_name ILIKE '%${skill_name}%'`, (error, result) => {
//             if (!error) {
//                 resolve(result)
//             } else {
//                 reject(error)
//             }
//         })
//     )
// }

module.exports = {
    // selectAllSkills,
    // searchSkills,
    showAddressByUserId,
    // findName,
    selectAddress,
    insertAddress,
    updateAddress,
    deleteAddress,
    countData,
    findId
}