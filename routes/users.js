const express = require('express')
const { getAllUsers, addUser, loginUser } = require('../controller/user')
const router = express.Router()
const { verifyJWT } = require('../middleware/auth')

router.get('/', getAllUsers)
router.post('/add', addUser)
router.post('/login', loginUser)

module.exports = router