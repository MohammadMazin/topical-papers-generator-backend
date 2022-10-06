const express = require('express')
const { getAllQuestions, addQuestion, deleteQuestion, searchQuestion } = require('../controller/question')
const router = express.Router()
const { adminAuth } = require('../middleware/auth')

router.get('/', getAllQuestions)
router.post('/add', adminAuth, addQuestion)
router.post('/delete', adminAuth, deleteQuestion)
router.post('/search', searchQuestion)

module.exports = router