const express = require('express')
const { getAllSubjects, addSubject } = require('../controller/Subject')
const router = express.Router()

router.get('/', getAllSubjects)
router.post('/add', addSubject)



module.exports = router