const express = require('express')
const { getAllSubjects, addSubject } = require('../controller/Subject')
const router = express.Router()
const { adminAuth } = require('../middleware/auth')

router.get('/', getAllSubjects)
router.post('/add', adminAuth, addSubject)

module.exports = router