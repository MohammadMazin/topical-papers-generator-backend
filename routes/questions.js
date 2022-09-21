const express = require('express')
const { getAllQuestions, addQuestion } = require('../controller/question')
const router = express.Router()

router.get('/', getAllQuestions)
router.post('/add', addQuestion)

module.exports = router