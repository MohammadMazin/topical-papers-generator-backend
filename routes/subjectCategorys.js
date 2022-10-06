const express = require('express')
const { getAllSubjectCategorys, addSubjectCategory, deleteSubjectCategory } = require('../controller/subjectCategory')
const router = express.Router()
const { adminAuth } = require('../middleware/auth')

router.get('/', getAllSubjectCategorys)
router.post('/add', adminAuth, addSubjectCategory)
router.post('/delete', adminAuth, deleteSubjectCategory)

module.exports = router