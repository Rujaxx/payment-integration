const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true,"Please add an username"],
        unique : true,
        trim : true,
        minlength : 5
    },
    email : {
        type : String,
        required : [true,"Please add an email"],
        unique : true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
          ]
    },
    phone: {
        type: String,
        required: [true, 'User phone number required'],
        unique: true,
        match: [/\d{10}/,'Please add a valid number' ]
      },  
    role : {
        type : String,  
        enum : ['admin','user'],
        default : 'user'
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 6,
      select: false
    },
    createdAt:{
        type : Date,
        default : Date.now
    },
    updatedAt: {
        type: Date,
        default: new Date()
    }
},{timestamps : true })

// Encrypting Password
UserSchema.pre('save' , async function(next){
    if(!this.isModified('password')){
        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)
})

// Match password
UserSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

// getSignedJwtToken
UserSchema.methods.getSignedJwtToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET,{
        expiresIn : process.env.JWT_EXPIRE
    })
}

module.exports = mongoose.model('User',UserSchema);