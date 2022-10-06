const express = require('express')
const { getAllBoards, addBoard, deleteBoard } = require('../controller/board')
const router = express.Router()
const { adminAuth } = require('../middleware/auth')


router.get('/', getAllBoards)
router.post('/add', adminAuth, addBoard)
router.post('/delete', adminAuth, deleteBoard)



module.exports = router