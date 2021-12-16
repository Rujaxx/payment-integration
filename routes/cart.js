const express = require('express')

const { createCart, getCarts, getCart, updateCart, deleteCart } = require('../controllers/cart')

const router = express.Router()

router.route('/')
.post(createCart)
.get(getCarts)

router.route('/:id')
.get(getCart)
.put(updateCart)
.delete(deleteCart)

module.exports = router