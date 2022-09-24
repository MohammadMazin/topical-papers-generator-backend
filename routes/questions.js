const express = require('express')
const { getAllQuestions, addQuestion, searchQuestion } = require('../controller/question')
const router = express.Router()

router.get('/', getAllQuestions)
router.post('/add', addQuestion)
router.post('/search', searchQuestion)

module.exports = router