const express = require('express')
const { getAllSubjectCategorys, addSubjectCategory } = require('../controller/subjectCategory')
const router = express.Router()

router.get('/', getAllSubjectCategorys)
router.post('/add', addSubjectCategory)



module.exports = router