const express = require('express')
const { getAllTopics, addTopic } = require('../controller/Topic')
const router = express.Router()
const { adminAuth } = require('../middleware/auth')

router.get('/', getAllTopics)
router.post('/add', adminAuth, addTopic)

module.exports = router