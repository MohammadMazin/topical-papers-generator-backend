const express = require('express')
const { getAllLevels, addLevel, deleteLevel, getAllLevelsOfBoard } = require('../controller/level')
const router = express.Router()
const { adminAuth } = require('../middleware/auth')

router.get('/', getAllLevels)
router.post('/add', adminAuth, addLevel)
router.post('/delete', adminAuth, deleteLevel)
router.post('/ofBoard', getAllLevelsOfBoard)

module.exports = router