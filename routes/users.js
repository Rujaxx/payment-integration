const express = require('express')

const { getUsers, getUser, updateUser, deleteUser  } = require('../controllers/users')

const router = express.Router()

const { protect, authorize } = require('../middlewares/auth')

router.route('/').get(protect,authorize('admin'),getUsers)

router.route('/:id').get(protect,authorize('admin','user'),getUser).put(protect,authorize('admin','user'),updateUser).delete(deleteUser)

module.exports = router