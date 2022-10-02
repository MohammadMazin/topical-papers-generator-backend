const Subject = require('../models/Subject')

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