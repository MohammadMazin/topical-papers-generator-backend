const Question = require('../models/Question')
const User = require('../models/User')


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
        const { title, description, answer, question, marks, boardId, levelId, subjectId, questionTypeId, topicId, paid } = req.body
        const newQuestion = await Question.create({ title, description, marks, question, answer, boardId, levelId, subjectId, questionTypeId, topicId, paid })
        res.json({
            success: true,
            data: newQuestion
        })
    } catch (error) {
        res.json({
            error: true,
            message: error.message
        })
    }
}

exports.searchQuestion = async(req, res, next) => {
    try {
        const { query, boardId, levelId, subjectId, topicId, filterOn, userId } = req.body

        const user = await User.findOne({ _id: userId })
        if (!user)
            throw new Error('User not found!')

        var q = new RegExp(query, 'i')

        let data;
        if (!filterOn)
            data = await Question.find({
                description: { $regex: q },
                ...(user.paid ? {} : { paid: false })
            })
        else
            data = await Question.find({
                description: { $regex: q },
                ...(boardId ? { boardId } : {}),
                ...(levelId ? { levelId } : {}),
                ...(subjectId ? { subjectId } : {}),
                ...(topicId ? { topicId } : {}),
                ...(user.paid ? {} : { paid: false })
            })

        res.json({
            success: true,
            data
        })
    } catch (err) {
        next(err)
    }
}