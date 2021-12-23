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
exports.addToCart = asyncHandler(async( req, res, next) => {
    let cart

    const user = req.user.id
    const productId = req.params.productId

    // req.body.user = req.user.id
    // req.body.productId = req.params.id

    cart = await Cart.findOne({user})

    console.log(cart)
    if(cart){
        if(cart.products[0].productId==productId){
       cart = await Cart.findOneAndUpdate({'products.productId' : productId},{$inc : { 'products.$.quantity' :1 }},{new : true})
        }
    }       
   else{
     cart = await Cart.create({
        user,    
        products: [{ productId }]
      })
   }

    res.status(200).redirect('back')
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