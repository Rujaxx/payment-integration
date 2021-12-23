const express = require('express')

const { createProduct,getProducts, getProduct, updateProduct, deleteProduct  } = require('../controllers/products')

// Include other resource routers
const cartRouter = require('./cart');

const router = express.Router()

const { protect, authorize } = require('../middlewares/auth')

router.use('/:productId/cart', cartRouter);

router.route('/').post(protect,authorize('admin'),createProduct).get(getProducts)

router.route('/:id').get(protect,getProduct).put(protect,authorize('admin'),updateProduct).delete(protect,authorize('admin'),deleteProduct)

module.exports = router