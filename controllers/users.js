const User = require('../models/User')
const asyncHandler = require('../middlewares/async')
const ErrorResponse = require('../utils/errorResponse')

// @desc      get all users
// @route     GET /api/v1/users
// @access    Admin
exports.getUsers = asyncHandler(async( req, res, next) => {
    const users = await User.find()

    res.status(200).json({ 
        success : true,
        data : users
    })
})

// @desc      get a user
// @route     GET /api/v1/users/:id
// @access    Admin/Private
exports.getUser = asyncHandler(async( req, res, next) => {
    const user = await User.findById(req.params.id)

    if(!user){
        return next(new ErrorResponse('User not found',404))
    }

    res.status(200).json({ 
        success : true,
        data : user
    })
})


// @desc      update a user
// @route     PUT /api/v1/users/:id
// @access    Admin
exports.updateUser = asyncHandler(async( req, res, next) => {
    let user = await user.findById(req.params.id)

    if(!user){
        return next(new ErrorResponse('User not found',404))
    }

    user = await User.findByIdAndUpdate(req.params.id,{ $set : req.body}, {
        runValidators: true,
        new : true
    })

    res.status(200).json({ 
        success : true,
        data : user
    })
})

// @desc      delete a user
// @route     PUT /api/v1/users/:id
// @access    Admin
exports.deleteUser = asyncHandler(async( req, res, next) => {
    let user = await User.findById(req.params.id)

    if(!user){
        return next(new ErrorResponse('User not found',404))
    }

    user.remove()

    res.status(200).json({ 
        success : true,
        data : {}
    })
})