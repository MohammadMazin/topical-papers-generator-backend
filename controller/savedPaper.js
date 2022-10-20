const SavedPaper = require('../models/SavedPaper')

exports.getAllSavedPapers = async(req, res) => {
    try {
        const data = await SavedPaper.find()
        res.json({
            success: true,
            data
        })
    } catch (err) {
        res.json({
            error: true,
            message: error.message
        })
    }
}

exports.getAllSavedPapersOfUser = async(req, res) => {
    try {
        const { userId } = req.body
        const data = await SavedPaper.find({ userId })
        if (data)
            res.json({
                success: true,
                data
            })
        else
            throw new Error('Could not Load Papers')
    } catch (err) {
        res.json({
            error: true,
            message: err.message
        })
    }
}

exports.addSavedPaper = async(req, res) => {
    try {
        const { userId, marks, paperData } = req.body
        const data = await SavedPaper.create(req.body)
        if (data)
            res.json({
                success: true,
                message: 'Paper is Saved!'
            })
        else
            throw new Error('Could not save paper')

    } catch (error) {
        res.json({
            error: true,
            message: error.message
        })
    }
}

exports.deleteSavedPaper = async(req, res) => {
    try {
        const { _id } = req.body
        const data = await SavedPaper.deleteOne({ _id })
        if (data)
            res.json({
                success: true,
                message: 'Paper has been deleted!'
            })
        else
            throw new Error('Could not delete paper')

    } catch (error) {
        res.json({
            error: true,
            message: error.message
        })
    }
}