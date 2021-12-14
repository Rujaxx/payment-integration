const User = require('../models/User')
const asyncHandler = require('../middlewares/async')
const ErrorResponse = require('../utils/errorResponse')

// @desc      Register
// @route     Post /api/v1/auth/register
// @access    Public
exports.register = asyncHandler(async(req,res,next) => {
    const { 
        username,
        email,
        password,
        phone,
        role    
    } = req.body ;
      
    //Create User
    const user = await User.create({ 
        username,
        email,
        password,
        phone,
        role    
    })

   res.status(200).json({ success:true, message: 'User registered successfully'})
})

// @desc      Login
// @route     Post /api/v1/auth/login
// @access    Public
exports.login = asyncHandler(async(req, res, next) => {
    const { email, password} = req.body

    // Validate email and password
    if(!email || !password){
        return next(new ErrorResponse('Please provide email and password',400))
    }

    // Check User
    const user = await User.findOne({email}).select('+password')

    if(!user){
        return next(new ErrorResponse('User not found',404))
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password)

    if(!isMatch){
        return next(new ErrorResponse('Invalid Credentials',400))
    }

    res.status(200).json({ success : true, message: 'User logged in'})

})