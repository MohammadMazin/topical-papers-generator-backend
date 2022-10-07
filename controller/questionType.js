const QuestionType = require('../models/QuestionType')
const Question = require('../models/Question')

exports.getAllQuestionTypes = async(req, res, next) => {
    try {
        const data = await QuestionType.find()
        res.json({
            success: true,
            data
        })
    } catch (err) {
        next(err)
    }
}

exports.addQuestionType = async(req, res, next) => {
    try {
        const { name, description } = req.body
        const newQuestionType = await QuestionType.create({ name, description })
        res.json({
            success: true,
            data: newQuestionType
        })
    } catch (error) {
        res.json({
            error: true,
            message: error.message
        })
    }
}

exports.editQuestionType = async(req, res, next) => {
    try {
        const { _id, name, description } = req.body
        const newQuestionType = await QuestionType.updateOne({ _id }, { $set: { name, description } })
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

exports.deleteQuestionType = async(req, res, next) => {
    try {
        const { _id } = req.body
        await Question.deleteMany({ questionTypeId: _id })
        const newQuestionType = await QuestionType.deleteOne({ _id })
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