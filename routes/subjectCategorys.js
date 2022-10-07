const express = require('express')
const { getAllSubjectCategorys, addSubjectCategory, deleteSubjectCategory, editSubjectCategory } = require('../controller/subjectCategory')
const router = express.Router()
const { adminAuth } = require('../middleware/auth')

router.get('/', getAllSubjectCategorys)
router.post('/add', adminAuth, addSubjectCategory)
router.post('/delete', adminAuth, deleteSubjectCategory)
router.post('/edit', adminAuth, editSubjectCategory)

module.exports = router