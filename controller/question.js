const Question = require('../models/Question')
const User = require('../models/User')


exports.getAllQuestions = async(req, res, next) => {
    try {
        const data = await Question.find().populate([
            { path: 'topicId', select: 'name' },
            { path: 'questionTypeId', select: 'name' },
            { path: 'boardId', select: 'name' },
            { path: 'levelId', select: 'name' },
            { path: 'subjectId', select: 'name' },
        ])
        res.json({
            success: true,
            data
        })
    } catch (err) {
        res.json({
            error,
            message: err
        })
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
        if (user.guest) {
            var q = new RegExp(query, 'i')
            var data;
            if (!filterOn)
                data = await Question.find({
                    description: { $regex: q },
                    ...(user.paid ? {} : { paid: 2 })
                }).populate([
                    { path: 'topicId', select: 'name' },
                    { path: 'questionTypeId', select: 'name' },
                    { path: 'boardId', select: 'name' },
                    { path: 'levelId', select: 'name' },
                    { path: 'subjectId', select: 'name' },
                ])

            else
                data = await Question.find({
                    description: { $regex: q },
                    ...(boardId ? { boardId } : {}),
                    ...(levelId ? { levelId } : {}),
                    ...(subjectId ? { subjectId } : {}),
                    ...(topicId ? { topicId } : {}),
                    ...(user.paid ? {} : { paid: 2 })
                }).populate([
                    { path: 'topicId', select: 'name' },
                    { path: 'questionTypeId', select: 'name' },
                    { path: 'boardId', select: 'name' },
                    { path: 'levelId', select: 'name' },
                    { path: 'subjectId', select: 'name' },
                ])
        } else {
            var q = new RegExp(query, 'i')
            var data;
            if (!filterOn)
                data = await Question.find({
                    description: { $regex: q },
                    ...(user.paid ? {} : { $or: [{ paid: 0 }, { paid: 2 }] })
                }).populate([
                    { path: 'topicId', select: 'name' },
                    { path: 'questionTypeId', select: 'name' },
                    { path: 'boardId', select: 'name' },
                    { path: 'levelId', select: 'name' },
                    { path: 'subjectId', select: 'name' },
                ])

            else
                data = await Question.find({
                    description: { $regex: q },
                    ...(boardId ? { boardId } : {}),
                    ...(levelId ? { levelId } : {}),
                    ...(subjectId ? { subjectId } : {}),
                    ...(topicId ? { topicId } : {}),
                    ...(user.paid ? {} : { $or: [{ paid: 0 }, { paid: 2 }] })
                }).populate([
                    { path: 'topicId', select: 'name' },
                    { path: 'questionTypeId', select: 'name' },
                    { path: 'boardId', select: 'name' },
                    { path: 'levelId', select: 'name' },
                    { path: 'subjectId', select: 'name' },
                ])
        }



        res.json({
            success: true,
            data
        })
    } catch (err) {
        next(err)
    }
}