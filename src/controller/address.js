const { findEmail,
    showAddressByUserId,
    selectAddress,
    insertAddress,
    updateAddress,
    deleteAddress,
    // countData,
    findId } = require('../model/address')
const { v4: uuidv4 } = require('uuid')
const authHelper = require('../helper/auth')
const commonHelper = require('../helper/common')

const addressController = {
    // getAllUser: async (req, res) => {
    //   try {
    //     const page = Number(req.query.page) || 1
    //     const limit = Number(req.query.limit) || 10
    //     const offset = (page - 1) * limit
    //     const sortby = req.query.sortby || 'nama'
    //     const sort = req.query.sort?.toUpperCase() || 'ASC' // optional chaining
    //     const search = req.query.search || ''

    //     if (search) {
    //       result = await searchWorker(search, limit, offset, sortby, sort)
    //       count = await countData(search)
    //     } else {
    //       result = await selectAllWorker(limit, offset, sortby, sort)
    //       count = await countData()
    //     }

    //     const totalData = parseInt(count)
    //     const totalPage = Math.ceil(totalData / limit)
    //     const pagination = {
    //       currentPage: page,
    //       limit,
    //       totalData,
    //       totalPage
    //     }

    //     commonHelper.response(
    //       res,
    //       result.rows,
    //       200,
    //       'get data success ',
    //       pagination
    //     )
    //   } catch (err) {
    //     console.log(err)
    //   }
    // },

    getDetailAddress: async (req, res) => {
        const id = req.params.id_address;
        const { rowCount } = await findId(id);
        if (!rowCount) {
            return res.json({ message: "ID is Not Found" })
        }
        selectAddress(id)
            .then((result) => {
                commonHelper.response(res, result.rows, 200, "get data success");
            })
            .catch((err) => res.send(err));
    },

    updateAddress: async (req, res) => {
        const id = req.params.id_address;
        const { address_as, recepient_name, address, city_district, recepient_telephone, postal_code, id_customer } = req.body;

        const { rowCount } = await findId(id);
        if (!rowCount) return res.json({ message: "Worker Not Found!" });

        const data = {
            id,
            address_as,
            recepient_name,
            address,
            city_district,
            recepient_name,
            recepient_telephone,
            postal_code,
            id_customer
        };

        try {
            const result = await updateAddress(data);
            commonHelper.response(res, result.rows, 200, 'Worker data updated successfully');
        } catch (err) {
            console.log(err);
            commonHelper.response(res, null, 500, 'Error while updating worker data');
        }
    },

    createAddress: async (req, res) => {
        const { address_as, recepient_name, address, city_district, recepient_telephone, postal_code, id_customer } = req.body
        const id = uuidv4()
        const { rowCount } = await findId(id)
        if (rowCount) {
            return res.json({ message: 'id is already taken' })
        }
        const data = {
            id,
            address_as,
            recepient_name,
            address,
            city_district,
            recepient_telephone,
            postal_code,
            id_customer
        }
        insertAddress(data)
            .then((result) => {
                commonHelper.response(res, result.rows, 200, 'email is created')
            })
            .catch((err) => {
                console.log(err)
            })
    },

    deleteAddress: async (req, res) => {
        try {
            const id = (req.params.id_address)
            const { rowCount } = await findId(id)
            if (!rowCount) {
                return res.json({ message: 'ID is Not Found' })
            }
            const result = await deleteAddress(id)
            commonHelper.response(res, result.rows, 200, 'Product deleted')
        } catch (error) {
            console.log(error)
            res.status(500).send('Internal Server Error')
        }
    },
    getAddressCustomer: async (req, res) => {
        try {
            const id_customer = req.params.id_customer;
            const result = await showAddressByUserId(id_customer);
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

module.exports = addressController
