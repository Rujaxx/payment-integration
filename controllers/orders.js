const Order = require('../models/Order')
const asyncHandler = require('../middlewares/async')
const ErrorResponse = require('../utils/errorResponse')

// @desc      Get all orders
// @route     GET /api/v1/orders
// @access    Public
exports.getOrders = asyncHandler(async( req, res, next) => {
    const orders = await Order.find()

    res.status(200).render('home',{ 
        success : true,
        data : orders
    })

})

// @desc      get a order
// @route     GET /api/v1/orders/:id
// @access    Public
exports.getOrder = asyncHandler(async( req, res, next) => {
    const order = await Order.findOne({user: req.params.id})

    if(!order){
        return next(new ErrorResponse('Item not found',404))
    }

    res.status(200).json({ 
        success : true,
        data : order
    })
})

// @desc      Create a order
// @route     POST /api/v1/orders
// @access    Public
exports.createOrder = asyncHandler(async( req, res, next) => {
    const order = await Order.create(req.body)

    res.status(200).json({
        success : true,
        data : order
    })
})

// @desc      update a order
// @route     PUT /api/v1/orders/:id
// @access    Public
exports.updateOrder = asyncHandler(async( req, res, next) => {
    let order = await Order.findById(req.params.id)

    if(!order){
        return next(new ErrorResponse('order not found',404))
    }

    order = await Order.findByIdAndUpdate(req.params.id,{ $set : req.body}, {
        runValidators: true,
        new : true
    })

    res.status(200).json({ 
        success : true,
        data : order
    })
})

// @desc      delete a order
// @route     PUT /api/v1/orders/:id
// @access    Public
exports.deleteOrder = asyncHandler(async( req, res, next) => {
    let order = await Order.findById(req.params.id)

    if(!order){
        return next(new ErrorResponse('Cart not found',404))
    }

    order.remove()

    res.status(200).json({ 
        success : true,
        data : {}
    })
})