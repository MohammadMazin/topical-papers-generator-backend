const express = require('express')
const { getAllSubjects, addSubject, deleteSubject } = require('../controller/subject')
const router = express.Router()
const { adminAuth } = require('../middleware/auth')

router.get('/', getAllSubjects)
router.post('/add', adminAuth, addSubject)
router.post('/delete', adminAuth, deleteSubject)

module.exports = router