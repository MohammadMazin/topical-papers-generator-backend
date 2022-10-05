const express = require('express')
const { getAllTopics, addTopic, getTopicsOfSubject } = require('../controller/topic')
const router = express.Router()
const { adminAuth } = require('../middleware/auth')

router.get('/', getAllTopics)
router.post('/add', adminAuth, addTopic)
router.post('/ofSubject', getTopicsOfSubject)

module.exports = router