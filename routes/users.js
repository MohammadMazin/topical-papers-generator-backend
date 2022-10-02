const express = require('express')
const { getAllUsers, getSingleUser, addUser, loginUser, loginAdminUser, getUnverifiedUsers, approveUser, unapproveUser } = require('../controller/user')
const router = express.Router()
const { adminAuth } = require('../middleware/auth')

router.get('/', getAllUsers)
router.post('/user', getSingleUser)
router.get('/unverified', getUnverifiedUsers)
router.post('/add', adminAuth, addUser)
router.post('/login', loginUser)
router.post('/login/admin', loginAdminUser)
router.post('/approve', adminAuth, approveUser)
router.post('/unapprove', adminAuth, unapproveUser)

module.exports = router