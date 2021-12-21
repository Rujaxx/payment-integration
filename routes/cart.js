const express = require('express')

const { createCart, getCarts, getCart, updateCart, deleteCart } = require('../controllers/cart')

const router = express.Router()

const { protect, authorize } = require('../middlewares/auth')

router.route('/')
.post(protect,createCart)
.get(protect,getCarts)

router.route('/:id')
.get(protect,getCart)
.put(protect,updateCart)
.delete(protect,deleteCart)

module.exports = router