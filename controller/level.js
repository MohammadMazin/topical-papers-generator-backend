const Level = require('../models/Level')
const Question = require('../models/Question')

exports.getAllLevels = async(req, res, next) => {
    try {
        const data = await Level.find().populate('boardId', 'name')
        res.json({
            success: true,
            data
        })
    } catch (err) {
        next(err)
    }
}

exports.addLevel = async(req, res, next) => {
    try {
        const { name, description, boardId } = req.body
        const newLevel = await Level.create({ name, description, boardId })
        res.json({
            success: true,
            data: newLevel
        })
    } catch (error) {
        res.json({
            error: true,
            message: error
        })
    }
}

exports.deleteLevel = async(req, res) => {
    try {
        const { _id } = req.body
        await Question.deleteMany({ levelId: _id })
        const newLevel = await Level.deleteOne({ _id })
        res.json({
            success: true,
        })
    } catch (error) {
        res.json({
            error: true,
            message: error
        })
    }
}

exports.editLevel = async(req, res) => {
    try {
        const { _id, name, description, boardId } = req.body
        const newLevel = await Level.updateOne({ _id }, { $set: { name: name, description: description, boardId: boardId } })
        res.json({
            success: true,
        })
    } catch (error) {
        console.log(error)
        res.json({
            error: true,
            message: error
        })
    }
}

exports.getAllLevelsOfBoard = async(req, res, next) => {
    try {
        const { boardId } = req.body
        let level
        if (boardId === 'all-boards') {
            level = await Level.find()
        } else
            level = await Level.find({ boardId })

        if (level)
            res.json({
                success: true,
                data: level
            })
        else throw new Error('Could not find any levels for that boardId')
    } catch (error) {
        res.json({
            error: true,
            message: error.message
        })
    }
}