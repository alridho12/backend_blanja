const express = require('express')
const router = express.Router()
const addressController = require("../controller/address")

router
.get('/customer/:id_customer', addressController.getAddressCustomer)
.post('/' ,addressController.createAddress)
.put('/:id_address',addressController.updateAddress)
.delete('/:id_address',addressController.deleteAddress)

module.exports = router