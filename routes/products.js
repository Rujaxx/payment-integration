const express = require('express')

const { addProduct,getProducts, getProduct, updateProduct, deleteProduct  } = require('../controllers/products')

const router = express.Router()

router.route('/').post(addProduct).get(getProducts)

router.route('/:id').get(getProduct).put(updateProduct).delete(deleteProduct)

module.exports = router