const express = require('express')
const { getAllBoards, addBoard } = require('../controller/board')
const router = express.Router()

router.get('/', getAllBoards)
router.post('/add', addBoard)



module.exports = router