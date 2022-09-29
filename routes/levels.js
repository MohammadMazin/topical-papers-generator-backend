const express = require('express')
const { getAllLevels, addLevel, getAllLevelsOfBoard } = require('../controller/level')
const router = express.Router()

router.get('/', getAllLevels)
router.post('/add', addLevel)
router.post('/ofBoard', getAllLevelsOfBoard)



module.exports = router