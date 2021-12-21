const express = require('express')

const { createOrder, getOrders, getOrder, updateOrder, deleteOrder } = require('../controllers/orders')

const router = express.Router()

const { protect, authorize } = require('../middlewares/auth')

router.route('/')
.post(protect,createOrder)
.get(getOrders)

router.route('/:id')
.get(protect,getOrder)
.put(protect,updateOrder)
.delete(protect,deleteOrder)

module.exports = router