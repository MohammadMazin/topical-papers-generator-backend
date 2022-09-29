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
        const { title, description, answer, question, marks, questionTypeId } = req.body
        const newQuestion = await Question.create({ title, description, marks, question, answer, questionTypeId })
        res.json({
            success: true,
            data: newQuestion
        })
    } catch (error) {
        console.log(error)
        res.json({
            error: true,
            message: error.message
        })
    }
}

exports.searchQuestion = async(req, res, next) => {
    try {
        const { query } = req.body
        var q = new RegExp(query, 'i')
        const data = await Question.find({ description: { $regex: q } })
        res.json({
            success: true,
            data
        })
    } catch (err) {
        next(err)
    }
}