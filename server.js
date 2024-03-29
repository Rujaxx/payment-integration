const express = require('express');
const dotenv = require('dotenv')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const paypal = require('@paypal/checkout-server-sdk')
const errorHandler = require('./middlewares/error')

// Load env vars
dotenv.config({ path : './config/config.env'})

// Database connection
const connectDB = require('./config/db')
connectDB()

// Route files
const auth = require('./routes/auth')
const user = require('./routes/users')
const product = require('./routes/products')
const order = require('./routes/orders')
const cart = require('./routes/cart')

const app = express();

// Set EJS as templating engine
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// cookie-parser
app.use(cookieParser());

// Logger
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

// Mount route files
app.use('/api/v1/auth', auth)
app.use('/api/v1/users', user)
app.use('/api/v1/products', product)
app.use('/api/v1/orders', order)
app.use('/api/v1/cart', cart)

// app.get("/checkout", (req, res) => {
//     res.render("checkout", {
//       success : true,
//       paypalClientId : process.env.PAYPAL_CLIENT_ID
//     })
// })
// ErrorHandler
app.use(errorHandler)

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT,console.log(`Server listening at ${PORT}`))