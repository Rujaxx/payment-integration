const express = require('express')

const { addToCart, getCarts, getCart, updateCart, deleteCart } = require('../controllers/cart')

const router = express.Router({ mergeParams: true })

const { protect, authorize } = require('../middlewares/auth')

router.route('/')
// .get(protect,getCarts)
.get(protect,addToCart)

// router.route('/:id')
// .get(protect,getCart)
// .put(protect,updateCart)
// .delete(protect,deleteCart)

module.exports = router