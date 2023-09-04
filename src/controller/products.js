const {
  selectAllProduct,
  searchProduct,
  selectProduct,
  insertProduct,
  updateProduct,
  deleteProduct,
  showProductsBySellerId,
  countData,
  findId
} = require('../model/products')
const cloudinary = require("../middleware/cloudinary");
const { v4: uuidv4 } = require("uuid");
const createError = require("http-errors");


// const client = require('../config/redis')

const commonHelper = require('../helper/common')

const productController = {
  getAllProduct: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1
      const limit = Number(req.query.limit) || 100
      const offset = (page - 1) * limit
      const sortby = req.query.sortby || 'product_name'
      const sort = req.query.sort?.toUpperCase() || 'ASC' // optional chaining
      const search = req.query.search || ''

      if (search) {
        result = await searchProduct(search, limit, offset, sortby, sort)
        count = await countData(search)
      } else {
        result = await selectAllProduct(limit, offset, sortby, sort)
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
      const id = (req.params.product_id);
      const result = await selectProduct(id);

      commonHelper.response(res, result.rows, 200, 'get data success');
    } catch (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
  },
  createProduct: async (req, res) => {
    const { product_name,
      brand,
      price,
      color,
      size,
      stock,
      rating,
      category_id,
      description,
      id_seller
    } = req.body;
    const product_id = uuidv4();
    let image = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      image = result.secure_url;
    }
    const data = {
      product_id,
      product_name,
      brand,
      price,
      color,
      size,
      stock,
      rating,
      category_id,
      image,
      description,
      id_seller
    };
    insertProduct(data)
      .then((result) =>
        commonHelper.response(res, result.rows, 201, "Create Product Success")
      )
      .catch((err) => res.send(err));
  },
  updateProduct: async (req, res) => {
    try {
      const { product_name,
        brand,
        price,
        color,
        size,
        stock,
        rating,
        category_id,
        description,
        id_seller
      } = req.body;
      const product_id = (req.params.product_id);
      const { rowCount } = await findId(product_id);
      if (!rowCount) {
        return (createError(403, "ID is Not Found"));
      }

      let image = null;
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        image = result.secure_url;
      }

      const data = {
        product_id,
        product_name,
        brand,
        price,
        color,
        size,
        stock,
        rating,
        category_id,
        image,
        description,
        id_seller
      };
      updateProduct(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Product updated")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const id = (req.params.product_id)
      const { rowCount } = await findId(id)
      if (!rowCount) {
        return res.json({ message: 'ID is Not Found' })
      }
      const result = await deleteProduct(id)
      commonHelper.response(res, result.rows, 200, 'Product deleted')
    } catch (error) {
      console.log(error)
      res.status(500).send('Internal Server Error')
    }
  },

  getProductSeller: async (req, res) => {
    try {
      const id_seller = req.params.id_seller;
      const result = await showProductsBySellerId(id_seller);
      if (!result.rowCount) return commonHelper
        .response(res, null, 202, "User no havent skill");


      commonHelper.response(res, result.rows, 200,
        "Get user skills");
    } catch (error) {
      console.log(error);
      commonHelper.response(res, null, 500, "Failed getting user skills");
    }
  },
}

module.exports = productController
