const express = require('express');
const dotenv = require('dotenv')
const errorHandler = require('./middlewares/error')

// Load env vars
dotenv.config({ path : './config/config.env'})

// Database connection
const connectDB = require('./config/db')
connectDB()

// Route files
const auth = require('./routes/auth')

const app = express();

// Body parser
app.use(express.json())

// Mount route files
app.use('/api/v1/auth', auth)

// ErrorHandler
app.use(errorHandler)

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT,console.log(`Server listening at ${PORT}`))