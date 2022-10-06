const SubjectCategory = require('../models/SubjectCategory')
const Subject = require('../models/Subject')

exports.getAllSubjectCategorys = async(req, res, next) => {
    try {
        const data = await SubjectCategory.find()
        res.json({
            success: true,
            data
        })
    } catch (err) {
        next(err)
    }
}

exports.addSubjectCategory = async(req, res, next) => {
    try {
        const { name, description } = req.body
        const newSubjectCategory = await SubjectCategory.create({ name, description })
        res.json({
            success: true,
            data: newSubjectCategory
        })
    } catch (error) {
        res.json({
            error: true,
            message: error
        })
    }
}

exports.deleteSubjectCategory = async(req, res, next) => {
    try {
        const { _id } = req.body
        await Subject.deleteMany({ subjectCategoryId: _id })
        const newSubjectCategory = await SubjectCategory.deleteOne({ _id })
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