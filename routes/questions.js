const express = require('express')
const { getAllQuestions, addQuestion, searchQuestion } = require('../controller/question')
const router = express.Router()
const { adminAuth } = require('../middleware/auth')

router.get('/', getAllQuestions)
router.post('/add', adminAuth, addQuestion)
router.post('/search', searchQuestion)

module.exports = router