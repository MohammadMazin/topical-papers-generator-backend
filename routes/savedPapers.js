const express = require('express')
const { getAllSavedPapers, getAllSavedPapersOfUser, addSavedPaper, deleteSavedPaper } = require('../controller/savedPaper')
const router = express.Router()
const { adminAuth } = require('../middleware/auth')

router.get('/', getAllSavedPapers)
router.post('/user', getAllSavedPapersOfUser)
router.post('/add', addSavedPaper)
router.post('/delete', deleteSavedPaper)

module.exports = router