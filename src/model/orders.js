const pool = require('../config/db')

const selectAllOrder = (limit, offset, sortby, sort) => {
  return pool.query(
    `SELECT * FROM orders ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`
  )
}

const searchOrder = (search, limit, offset, sortby, sort) => {
  return pool.query(
    `SELECT * FROM orders WHERE address ILIKE '%${search}%' ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`
  )
}

const selectOrder = (id_customer) => {
  return pool.query(`SELECT orders.*,products.* FROM orders JOIN products ON orders.product_id = products.product_id WHERE orders.id_customer ='${id_customer}'`)
}

const insertOrder = (data) => {
  const {
    id_order,
    product_id,
    id_customer,
    quantity,
  } = data
  return pool.query(
    `INSERT INTO orders (id_order,product_id,id_customer,quantity) VALUES ('${id_order}','${product_id}','${id_customer}',${quantity}) `
  )
}

const updateOrder = (data) => {
  const {
    id_order,
    product_id,
    id_customer
  } = data
  return pool.query(
    `UPDATE orders SET id_order = '${id_order}', product_id = '${product_id}', id_customer = ${id_customer} WHERE id_order = ${id_order}`
  )
}

const deleteOrder = (id_customer) => {
  return pool.query(`DELETE FROM orders WHERE id_customer = ${id_customer}`)
}

const countData = () => {
  return pool.query('SELECT COUNT(*) FROM orders')
}

const findId = (id) => {
  return pool.query(`SELECT COUNT(*) FROM orders WHERE id_order = '${id}'`)
}

module.exports = {
  selectAllOrder,
  searchOrder,
  selectOrder,
  insertOrder,
  updateOrder,
  deleteOrder,
  countData,
  findId
}
