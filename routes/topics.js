const express = require('express')
const { getAllTopics, addTopic, deleteTopic, editTopic, getTopicsOfSubject } = require('../controller/topic')
const router = express.Router()
const { adminAuth } = require('../middleware/auth')

router.get('/', getAllTopics)
router.post('/add', adminAuth, addTopic)
router.post('/delete', adminAuth, deleteTopic)
router.post('/edit', adminAuth, editTopic)
router.post('/ofSubject', getTopicsOfSubject)

module.exports = router