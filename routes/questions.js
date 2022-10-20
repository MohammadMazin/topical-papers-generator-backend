const express = require('express')
const { getAllQuestions, addQuestion, deleteQuestion, editQuestion, searchQuestion, getQuestionFromIds } = require('../controller/question')
const router = express.Router()
const { adminAuth } = require('../middleware/auth')

router.get('/', getAllQuestions)
router.post('/fromIds', getQuestionFromIds)
router.post('/add', adminAuth, addQuestion)
router.post('/delete', adminAuth, deleteQuestion)
router.post('/edit', adminAuth, editQuestion)
router.post('/search', searchQuestion)

module.exports = router