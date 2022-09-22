const User = require('../models/User')
const bcrypt = require('bcrypt')

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
        const { username, email, password, name, phoneNumber, dateOfBirth, subjects, isAdmin } = req.body
        const salt = await bcrypt.genSalt()
        const hashedPasword = await bcrypt.hash(password, salt)
        const newUser = await User.create({ username, email, password: hashedPasword, name, phoneNumber, dateOfBirth, subjects, isAdmin })
        res.json({
            success: true,
            data: newUser
        })
    } catch (error) {
        res.json({
            error
        })
    }
}

exports.loginUser = async(req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })

        if (!user)
            res.send('User Not Found')
            // TODO: How to handle admin check
        if (await bcrypt.compare(password, user.password)) {
            res.json({
                success: true,
                data: {
                    _id: user._id,
                    name: user.name,
                    phoneNumber: user.phoneNumber,
                    subjects: user.subjects,
                    email: user.email,
                }
            })
        } else {
            res.send('Not Allowed')
        }

    } catch (error) {
        res.json({
            error: true,
            message: error
        })
    }
}