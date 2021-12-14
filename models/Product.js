const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    productname : {
        type : String,
        required : [true,"Please add an product name"],
        unique : true,
        trim : true,
        minlength : 5
    },
    description : {
        type : String,
        required : [true,"Please add an description"],
        trim : true,
        minlength : 10
    },
    price : {
        type : Number,
        required: [true,"Please add a price"]
    },
    createdAt:{
        type : Date,
        default : Date.now
    },
    updatedAt: {
        type: Date,
        default: new Date()
    }
},{timestamps:true})


module.exports = mongoose.model('Product',ProductSchema)