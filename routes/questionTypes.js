const express = require('express')
const { getAllQuestionTypes, deleteQuestionType, addQuestionType } = require('../controller/questionType')
const router = express.Router()
const { adminAuth } = require('../middleware/auth')

router.get('/', getAllQuestionTypes)
router.post('/add', adminAuth, addQuestionType)
router.post('/delete', adminAuth, deleteQuestionType)

module.exports = router