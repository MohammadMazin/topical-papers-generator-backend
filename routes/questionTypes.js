const express = require('express')
const { getAllQuestionTypes, deleteQuestionType, editQuestionType, addQuestionType } = require('../controller/questionType')
const router = express.Router()
const { adminAuth } = require('../middleware/auth')

router.get('/', getAllQuestionTypes)
router.post('/add', adminAuth, addQuestionType)
router.post('/delete', adminAuth, deleteQuestionType)
router.post('/edit', adminAuth, editQuestionType)

module.exports = router