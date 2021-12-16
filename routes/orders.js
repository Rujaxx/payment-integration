const express = require('express')

const { createOrder, getOrders, getOrder, updateOrder, deleteOrder } = require('../controllers/orders')

const router = express.Router()

router.route('/')
.post(createOrder)
.get(getOrders)

router.route('/:id')
.get(getOrder)
.put(updateOrder)
.delete(deleteOrder)

module.exports = router