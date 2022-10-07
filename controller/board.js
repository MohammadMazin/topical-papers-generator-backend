const Board = require('../models/Board')
const Question = require('../models/Question')
const Level = require('../models/Level')
const Subject = require('../models/Subject')

exports.getAllBoards = async(req, res, next) => {
    try {
        const data = await Board.find()
        res.json({
            success: true,
            data
        })
    } catch (err) {
        res.json({
            error: true,
            message: error
        })
    }
}

exports.addBoard = async(req, res, next) => {
    try {
        const { name, location } = req.body
        const newBoard = await Board.create({ name, location })
        res.json({
            success: true,
            data: newBoard
        })
    } catch (error) {
        res.json({
            error: true,
            message: error
        })
    }
}

exports.editBoard = async(req, res) => {
    try {
        const { _id, name, location } = req.body
        const data = await Board.updateOne({ _id }, { $set: { name: name, location: location } })
        if (!data)
            throw new Error('Could not update board!')
        res.json({
            success: true,
            data
        })

    } catch (error) {
        res.json({
            error: true,
            message: error.message
        })
    }
}

exports.deleteBoard = async(req, res, next) => {
    try {
        const { _id } = req.body

        await Question.deleteMany({ boardId: _id })
        await Level.deleteMany({ boardId: _id })
        await Subject.deleteMany({ boardId: _id })
        const newBoard = await Board.deleteOne({ _id })
        if (!newBoard)
            throw new Error('Failed to delete board')
        res.json({
            success: true,
        })
    } catch (error) {
        res.json({
            error: true,
            message: error.message
        })
    }
}