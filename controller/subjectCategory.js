const SubjectCategory = require('../models/SubjectCategory')

exports.getAllSubjectCategorys = async(req, res, next) => {
    try {
        const data = await SubjectCategory.find()
        res.json(data)
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