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
    
    sendTokenResponse(user, 200, res)
})

// @desc      Register get
// @route     Get /api/v1/auth/register
// @access    Public
exports.registerGet = asyncHandler(async(req,res,next) => {
    res.status(200).render('register',{
        title: "Register"
    })
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

    sendTokenResponse(user, 200, res)
})

// @desc      login get
// @route     Get /api/v1/auth/login
// @access    Public
exports.loginGet = asyncHandler(async(req,res,next) => {
    res.status(200).render('login',{
        title: "login"
    })
})


// Token Response
const sendTokenResponse = (user , statusCode, res) => {
    // Create token
    const token = user.getSignedJwtToken();

    const options = {
        expires : new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 1000 * 24 * 60 * 60
        ),
        httpOnly: true
    }

    res
    .status(statusCode)
    .cookie('token', token, options)
    .redirect('/api/v1/products')
}