const express = require('express')
const { getAllBoards, addBoard, deleteBoard, editBoard } = require('../controller/board')
const router = express.Router()
const { adminAuth } = require('../middleware/auth')


router.get('/', getAllBoards)
router.post('/add', adminAuth, addBoard)
router.post('/delete', adminAuth, deleteBoard)
router.post('/edit', adminAuth, editBoard)



module.exports = router