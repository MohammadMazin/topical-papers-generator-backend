const express = require('express')
const { getAllLevels, addLevel } = require('../controller/level')
const router = express.Router()

router.get('/', getAllLevels)
router.post('/add', addLevel)



module.exports = router