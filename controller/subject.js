const Subject = require('../models/Subject')
const Question = require('../models/Question')
const Topic = require('../models/Topic')
const User = require('../models/User')

exports.getAllSubjects = async(req, res, next) => {
    try {

        const data = await Subject.aggregate([{ $sort: { name: 1 } }])
        await Subject.populate(data, { path: 'subjectCategoryId' })
        await Subject.populate(data, { path: 'boardId' })

        res.json({
            success: true,
            data
        })
    } catch (err) {
        next(err)
    }
}

exports.addSubject = async(req, res, next) => {
    try {
        const { name, boardId, subjectCategoryId } = req.body
        const newSubject = await Subject.create({ name, subjectCategoryId, boardId })
        res.json({
            success: true,
            data: newSubject
        })
    } catch (error) {
        res.json({
            error: true,
            message: error
        })
    }
}

exports.deleteSubject = async(req, res, next) => {
    try {
        const { _id } = req.body

        await Question.deleteMany({ subjectId: _id })
        await Topic.deleteMany({ subjectId: _id })
            // todo: test
        await User.updateMany({}, { $pull: { subjects: { $in: [_id] } } })
        const newSubject = await Subject.deleteOne({ _id })
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

exports.editSubject = async(req, res) => {
    try {

        const { _id, name, boardId, subjectCategoryId } = req.body
        const updatedSubject = await Subject.updateOne({ _id }, { $set: { name, boardId, subjectCategoryId } })
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