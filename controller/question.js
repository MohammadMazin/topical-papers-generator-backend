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

exports.getQuestionFromIds = async(req, res) => {
    try {
        const { idArray } = req.body
        const data = await Question.find({ _id: { $in: idArray } })
        if (!data)
            throw new Error('Could not find Questions!')
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

exports.addQuestion = async(req, res, next) => {
    try {
        const { title, description, answer, question, marks, year, month, variant, courseId, boardId, levelId, subjectId, questionTypeId, topicId, paid } = req.body
        const newQuestion = await Question.create({ title, description, marks, year, month, variant, courseId, question, answer, boardId, levelId, subjectId, questionTypeId, topicId, paid })
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
        const { query, description, boardId, levelId, subjectId, questionTypeId, courseId, topicId, filterOn, userId } = req.body


        const user = await User.findOne({ _id: userId })
        if (!user)
            throw new Error('User not found!')

        // Guest User
        if (user.guest) {
            var q = new RegExp(query, 'i')
            var data;
            if (!filterOn) {

                //Search without filters
                const userData = await User.findOne({ _id: userId })
                if (!userData)
                    throw new Error('Could not get user information for searching')
                const userSubjects = userData.subjects

                data = await Question.find({
                        title: { $regex: q },
                        subjectId: { $in: userSubjects },
                        ...(user.paid ? {} : { paid: 2 })
                    }).populate([
                        { path: 'topicId', select: 'name' },
                        { path: 'questionTypeId', select: 'name' },
                        { path: 'boardId', select: 'name' },
                        { path: 'levelId', select: 'name' },
                        { path: 'subjectId', select: 'name' },
                    ])
                    //Search with filters
            } else
                data = await Question.find({
                    title: { $regex: q },
                    ...(courseId ? { courseId: { $in: courseId } } : {}),
                    ...(description ? { description: { $in: description } } : {}),
                    ...(questionTypeId ? { questionTypeId } : {}),
                    ...(boardId ? { boardId } : {}),
                    ...(levelId ? { levelId } : {}),
                    ...(subjectId ? { subjectId } : {}),
                    ...(user.paid ? {} : { paid: 2 })
                }).populate([
                    { path: 'topicId', select: 'name' },
                    { path: 'questionTypeId', select: 'name' },
                    { path: 'boardId', select: 'name' },
                    { path: 'levelId', select: 'name' },
                    { path: 'subjectId', select: 'name' },
                ])
        }

        // Non Guest User
        else {
            var q = new RegExp(query, 'i')
            var data;
            if (!filterOn) {
                //Search without filters
                const userData = await User.findOne({ _id: userId })
                if (!userData)
                    throw new Error('Could not get user information for searching')
                const userSubjects = userData.subjects
                data = await Question.find({
                    title: { $regex: q },
                    subjectId: { $in: userSubjects },
                    ...(user.paid ? {} : { $or: [{ paid: 0 }, { paid: 2 }] })
                }).populate([
                    { path: 'topicId', select: 'name' },
                    { path: 'questionTypeId', select: 'name' },
                    { path: 'boardId', select: 'name' },
                    { path: 'levelId', select: 'name' },
                    { path: 'subjectId', select: 'name' },
                ])
            }
            //Search with filters
            else
                data = await Question.find({
                    title: { $regex: q },
                    ...(courseId ? { courseId: { $in: courseId } } : {}),
                    ...(description ? { description: { $in: description } } : {}),
                    ...(questionTypeId ? { questionTypeId } : {}),
                    ...(boardId ? { boardId } : {}),
                    ...(levelId ? { levelId } : {}),
                    ...(subjectId ? { subjectId } : {}),
                    ...(topicId ? { topicId: { $in: topicId } } : {}),
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

exports.deleteQuestion = async(req, res) => {
    try {

        const { _id } = req.body
        const question = await Question.deleteOne({ _id })
        if (!question)
            throw new Error('Failed to Delete Question')
        res.json({
            success: true
        })

    } catch (error) {
        res.json({
            error,
            message: error.message
        })
    }
}

exports.editQuestion = async(req, res) => {
    try {
        const { _id, title, description, answer, question, marks, year, month, variant, courseId, boardId, levelId, subjectId, questionTypeId, topicId, paid } = req.body

        const updateQuestion = await Question.updateOne({ _id }, { $set: { title: title, description: description, marks: marks, year: year, month: month, variant: variant, courseId: courseId, question: question, answer: answer, boardId: boardId, levelId: levelId, subjectId: subjectId, questionTypeId: questionTypeId, topicId: topicId, paid: paid } })
        res.json({
            success: true,
            data: updateQuestion
        })
    } catch (error) {
        res.json({
            error,
            message: error.message
        })
    }
}