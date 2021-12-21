const express = require('express')

const { createProduct,getProducts, getProduct, updateProduct, deleteProduct  } = require('../controllers/products')

const router = express.Router()

const { protect, authorize } = require('../middlewares/auth')

router.route('/').post(protect,authorize('admin'),createProduct).get(getProducts)

router.route('/:id').get(getProduct).put(protect,authorize('admin'),updateProduct).delete(protect,authorize('admin'),deleteProduct)

module.exports = router