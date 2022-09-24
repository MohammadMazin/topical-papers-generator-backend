const Question = require('../models/Question')

exports.getAllQuestions = async(req, res, next) => {
    try {
        const data = await Question.find()
        res.json(data)
    } catch (err) {
        next(err)
    }
}

exports.addQuestion = async(req, res, next) => {
    try {
        const { title, description, answer, marks, questionTypeId } = req.body
        const newQuestion = await Question.create({ title, description, marks, answer, questionTypeId })
        res.json({
            success: true,
            data: newQuestion
        })
    } catch (error) {
        res.json({
            error: true,
            message: error
        })
    }
}

exports.searchQuestion = async(req, res, next) => {
    try {
        const { query } = req.body
        var q = new RegExp(query, '')
        const data = await Question.find({ description: { $regex: q } })
        res.json({
            success: true,
            data
        })
    } catch (err) {
        next(err)
    }
}