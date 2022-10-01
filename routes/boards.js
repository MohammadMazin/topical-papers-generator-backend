const express = require('express')
const { getAllBoards, addBoard } = require('../controller/board')
const router = express.Router()
const { adminAuth } = require('../middleware/auth')


router.get('/', getAllBoards)
router.post('/add', adminAuth, addBoard)



module.exports = router