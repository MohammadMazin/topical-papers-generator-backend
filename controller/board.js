const Board = require('../models/Board')

exports.getAllBoards = async(req, res, next) => {
    try {
        const data = await Board.find()
        res.json({
            success: true,
            data
        })
    } catch (err) {
        res.json({
            error: true,
            message: error
        })
    }
}

exports.addBoard = async(req, res, next) => {
    try {
        const { name, location } = req.body
        const newBoard = await Board.create({ name, location })
        res.json({
            success: true,
            data: newBoard
        })
    } catch (error) {
        res.json({
            error: true,
            message: error
        })
    }


}