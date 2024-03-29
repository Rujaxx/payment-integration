const jwt = require('jsonwebtoken')
const User = require('../models/User')
const asyncHandler = require('./async')
const ErrorResponse = require('../utils/errorResponse')

// Check user is logged in
exports.protect = asyncHandler(async(req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        // Set token from Bearer token in header
        token = req.headers.authorization.split(' ')[1];
    }else if(req.cookies.token) {
        token = req.cookies.token
    }

    // Make sure token exists
    if(!token){
        return next(new ErrorResponse('Please login to access',401))
    }

    try {
    // Verify token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findById(decoded.id)

    next()
    } catch(err){
        return next(new ErrorResponse('Please login to access',401))
    }
})


// Admin authorization
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next(new ErrorResponse('Not Authorized to access this route',401))
        }
    
        next()
    }
}