const {
  selectAllOrder,
  searchOrder,
  selectOrder,
  insertOrder,
  updateOrder,
  deleteOrder,
  countData,
  findId
} = require('../model/orders')

const commonHelper = require('../helper/common')
const { v4: uuidv4 } = require("uuid");

const ordersController = {
  getAllOrder: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1
      const limit = Number(req.query.limit) || 5
      const offset = (page - 1) * limit
      const sortby = req.query.sortby || 'id_order'
      const sort = req.query.sort?.toUpperCase() || 'ASC'
      const search = req.query.search || ''

      if (search) {
        result = await searchOrder(search, limit, offset, sortby, sort)
        count = await countData(search)
      } else {
        result = await selectAllOrder(limit, offset, sortby, sort)
        count = await countData()
      }

      const totalData = parseInt(count)
      const totalPage = Math.ceil(totalData / limit)
      const pagination = {
        currentPage: page,
        limit,
        totalData,
        totalPage
      }

      commonHelper.response(
        res,
        result.rows,
        200,
        'get data success ',
        pagination
      )
    } catch (err) {
      console.log(err)
    }
  },
  getDetailProduct: async (req, res) => {
    try {
      const id =(req.params.product_id)
      const result = await selectProduct(id)
      commonHelper.response(res, result.rows, 200, 'get data success')
    } catch (err) {
      console.log(err)
      res.status(500).send('Internal Server Error')
    }
  },
  getDetailOrder: async (req, res) => {
    const id = req.params.id_customer;
    const { rowCount } = await findId(id);
    if (!rowCount) {
        return res.json({ message: "ID is Not Found" })
    }
    selectOrder(id)
        .then((result) => {
            commonHelper.response(res, result.rows, 200, "get data success");
        })
        .catch((err) => res.send(err));
},

  createOrder: async (req, res) => {
    try {
      const {
        product_id,
        id_customer,
        quantity,
      } = req.body
      const id_order = uuidv4();
      const { rowCount } = await findId(id_order)
      const data = {
        id_order, 
        product_id,
        id_customer,
        quantity,
      }
      const result = await insertOrder(data)
      commonHelper.response(res, result.rows, 201, 'order created')
    } catch (err) {
      console.log(err)
      res.status(500).send('Internal Server Error')
    }
  },
  updateOrder: async (req, res) => {
    try {
      const id = Number(req.params.id_order)
      const {
        id_order,
        order_date,
        address,
        price,
        shipping,
        total_price,
        payment_method,
        product_id,
        customer_id,
        image
      } = req.body
      const { rowCount } = await findId(id)
      if (!rowCount) {
        return res.json({ message: 'ID is Not Found' })
      }
      const data = {
        id_order: id,
        order_date,
        address,
        price,
        shipping,
        total_price,
        payment_method,
        product_id,
        customer_id,
        image
      }
      const result = await updateOrder(data)
      commonHelper.response(res, result.rows, 200, 'Order updated')
    } catch (error) {
      console.log(error)
      res.status(500).send('Internal Server Error')
    }
  },
  deleteOrder: async (req, res) => {
    try {
      const id = Number(req.params.id_order)
      const { rowCount } = await findId(id)
      if (!rowCount) {
        return res.json({ message: 'ID is Not Found' })
      }
      const result = await deleteOrder(id)
      commonHelper.response(res, result.rows, 200, 'Order deleted')
    } catch (error) {
      console.log(error)
      res.status(500).send('Internal Server Error')
    }
  }
}

module.exports = ordersController
