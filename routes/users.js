const express = require('express')
const { getAllUsers, getVerifiedUsers, getSingleUser, addUser, setUserPaidStatus, loginUser, loginAdminUser, getUnverifiedUsers, approveUser, unapproveUser, createAdmin } = require('../controller/user')
const router = express.Router()
const { adminAuth } = require('../middleware/auth')

router.get('/', getAllUsers)
router.get('/verified', getVerifiedUsers)
router.post('/user', getSingleUser)
router.get('/unverified', getUnverifiedUsers)
router.post('/add', adminAuth, addUser)
router.post('/setPaid', adminAuth, setUserPaidStatus)
router.post('/add/admin', adminAuth, createAdmin)
router.post('/login', loginUser)
router.post('/login/admin', loginAdminUser)
router.post('/approve', adminAuth, approveUser)
router.post('/unapprove', adminAuth, unapproveUser)

module.exports = router