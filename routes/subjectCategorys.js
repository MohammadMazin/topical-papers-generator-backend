const express = require('express')
const { getAllSubjectCategorys, addSubjectCategory } = require('../controller/subjectCategory')
const router = express.Router()
const { adminAuth } = require('../middleware/auth')

router.get('/', getAllSubjectCategorys)
router.post('/add', adminAuth, addSubjectCategory)



module.exports = router