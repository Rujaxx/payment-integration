const express = require('express')

const { register,login,registerGet,loginGet } = require('../controllers/auth')

const router = express.Router()

router.route('/register').post(register).get(registerGet)
router.route('/login').post(login).get(loginGet)

module.exports = router