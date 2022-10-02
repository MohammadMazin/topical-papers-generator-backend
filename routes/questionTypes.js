const express = require('express')
const { getAllQuestionTypes, addQuestionType } = require('../controller/questionType')
const router = express.Router()
const { adminAuth } = require('../middleware/auth')

router.get('/', getAllQuestionTypes)
router.post('/add', adminAuth, addQuestionType)

module.exports = router