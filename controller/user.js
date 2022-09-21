const User = require('../models/User')

exports.getAllUsers = async(req, res, next) => {
    try {
        const data = await User.find()
        res.json(data)
    } catch (err) {
        next(err)
    }
}

exports.addUser = async(req, res, next) => {
    try {
        const { username, password, name, phoneNumber, dateOfBirth, subjects, isAdmin } = req.body
        const newUser = await User.create({ username, password, name, phoneNumber, dateOfBirth, subjects, isAdmin })
        res.json({
            success: true,
            data: newUser
        })
    } catch (error) {
        res.json({
            error: true,
            message: error
        })
    }


}