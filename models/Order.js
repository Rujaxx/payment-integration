const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    user: {
        type : mongoose.Schema.ObjectId,
        ref: "User",
        required : true,
    },
    products :[{
        productId :{
            type : mongoose.Schema.ObjectId,
            ref : "Product",
        },
        quantity :{
            type : Number,
            default : 1
        }
    }],
    amount :{
        type: Number,
        required: true
    },
    status : {
        type : String,
        default : 'Pending..'
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


module.exports = mongoose.model('Order',OrderSchema)