const Product = require('../models/Product')
const asyncHandler = require('../middlewares/async')
const ErrorResponse = require('../utils/errorResponse')

// @desc      get all products
// @route     GET /api/v1/products
// @access    Public
exports.getProducts = asyncHandler(async( req, res, next) => {
    const products = await Product.find()

    res.status(200).json({ 
        success : true,
        data : products
    })
})

// @desc      get a product
// @route     GET /api/v1/products/:id
// @access    Public
exports.getProduct = asyncHandler(async( req, res, next) => {
    const product = await Product.findById(req.params.id)

    if(!product){
        return next(new ErrorResponse('Item not found',404))
    }

    res.status(200).json({ 
        success : true,
        data : product
    })
})

// @desc      Create a product
// @route     POST /api/v1/products
// @access    Admin
exports.addProduct = asyncHandler(async( req, res, next) => {
    const product = await Product.create(req.body)

    res.status(200).json({
        success : true,
        data : product
    })
})

// @desc      update a product
// @route     PUT /api/v1/products/:id
// @access    Public
exports.updateProduct = asyncHandler(async( req, res, next) => {
    let product = await Product.findById(req.params.id)

    if(!product){
        return next(new ErrorResponse('Item not found',404))
    }

    product = await Product.findByIdAndUpdate(req.params.id,req.body, {
        runValidators: true,
        new : true
    })

    res.status(200).json({ 
        success : true,
        data : product
    })
})

// @desc      delete a product
// @route     PUT /api/v1/products/:id
// @access    Public
exports.deleteProduct = asyncHandler(async( req, res, next) => {
    let product = await Product.findById(req.params.id)

    if(!product){
        return next(new ErrorResponse('Item not found',404))
    }

    product.remove()

    res.status(200).json({ 
        success : true,
        data : {}
    })
})