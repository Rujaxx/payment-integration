const express = require('express');
const dotenv = require('dotenv')

// Load env vars
dotenv.config({ path : './config/config.env'})

// Database connection
const connectDB = require('./config/db')
connectDB()

const app = express();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT,console.log(`Server listening at ${PORT}`))