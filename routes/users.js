const express = require('express')
const { getAllUsers, getSingleUser, addUser, loginUser, loginAdminUser, getUnverifiedUsers } = require('../controller/user')
const router = express.Router()

router.get('/', getAllUsers)
router.post('/user', getSingleUser)
    // TODO: add admin authentication
router.get('/unverified', getUnverifiedUsers)
router.post('/add', addUser)
router.post('/login', loginUser)
router.post('/login/admin', loginAdminUser)

module.exports = router