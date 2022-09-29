const QuestionType = require('../models/QuestionType')

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