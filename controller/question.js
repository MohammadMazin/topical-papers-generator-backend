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
        const { title, description, answer, question, marks, boardId, levelId, subjectId, questionTypeId, topicId } = req.body
        const newQuestion = await Question.create({ title, description, marks, question, answer, boardId, levelId, subjectId, questionTypeId, topicId })
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
        const { query, boardId, levelId, subjectId, topicId, filterOn } = req.body
        var q = new RegExp(query, 'i')

        let data;
        if (!filterOn)
            data = await Question.find({ description: { $regex: q } })
        else
            data = await Question.find({
                description: { $regex: q },
                ...(boardId ? { boardId } : {}),
                ...(levelId ? { levelId } : {}),
                ...(subjectId ? { subjectId } : {}),
                ...(topicId ? { topicId } : {}),
            })

        res.json({
            success: true,
            data
        })
    } catch (err) {
        next(err)
    }
}