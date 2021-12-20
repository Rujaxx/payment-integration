const Cart = require('../models/Cart')
const asyncHandler = require('../middlewares/async')
const ErrorResponse = require('../utils/errorResponse')

// @desc      Get Cart
// @route     GET /api/v1/cart
// @access    Public
exports.getCarts = asyncHandler(async( req, res, next) => {
    const carts = await Cart.find()

    res.status(200).json({ 
        success : true,
        data : carts
    })

})

// @desc      get a product
// @route     GET /api/v1/cart/:id
// @access    Public
exports.getCart = asyncHandler(async( req, res, next) => {
    const cart = await Cart.findOne({user: req.params.id})

    if(!cart){
        return next(new ErrorResponse('Item not found',404))
    }

    res.status(200).json({ 
        success : true,
        data : cart
    })
})

// @desc      Create a cart
// @route     POST /api/v1/cart
// @access    Admin
exports.createCart = asyncHandler(async( req, res, next) => {
    const cart = await Cart.create(req.body)

    res.status(200).json({
        success : true,
        data : cart
    })
})

// @desc      update a cart
// @route     PUT /api/v1/cart/:id
// @access    Public
exports.updateCart = asyncHandler(async( req, res, next) => {
    let cart = await Cart.findById(req.params.id)

    if(!cart){
        return next(new ErrorResponse('Cart not found',404))
    }

    cart = await Cart.findByIdAndUpdate(req.params.id,{ $set : req.body}, {
        runValidators: true,
        new : true
    })

    res.status(200).json({ 
        success : true,
        data : cart
    })
})

// @desc      delete a cart
// @route     PUT /api/v1/cart/:id
// @access    Public
exports.deleteCart = asyncHandler(async( req, res, next) => {
    let cart = await Cart.findById(req.params.id)

    if(!cart){
        return next(new ErrorResponse('Cart not found',404))
    }

    cart.remove()

    res.status(200).json({ 
        success : true,
        data : {}
    })
})