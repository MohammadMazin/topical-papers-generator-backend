const express = require('express')
const { getAllQuestionTypes, addQuestionType } = require('../controller/questionType')
const router = express.Router()

router.get('/', getAllQuestionTypes)
router.post('/add', addQuestionType)

module.exports = router