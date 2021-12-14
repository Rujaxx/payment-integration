const User = require('../models/User')

// @desc      Register
// @route     Post /api/v1/auth/register
// @access    Public
exports.register = async(req,res,next) => {
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
    });

   res.status(200).json({ success:true, message: 'User registered successfully'})
}