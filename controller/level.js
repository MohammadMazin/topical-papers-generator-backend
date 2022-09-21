const Level = require('../models/Level')

exports.getAllLevels = async(req, res, next) => {
    try {
        const data = await Level.find()
        res.json(data)
    } catch (err) {
        next(err)
    }
}

exports.addLevel = async(req, res, next) => {
    try {
        const { name, description, boardId } = req.body
        const newLevel = await Level.create({ name, description, boardId })
        res.json({
            success: true,
            data: newLevel
        })
    } catch (error) {
        res.json({
            error: true,
            message: error
        })
    }


}