const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


exports.getAllUsers = async(req, res, next) => {
    try {
        const data = await User.find()
        res.json({
            success: true,
            data
        })
    } catch (err) {
        next(err)
    }
}

exports.getSingleUser = async(req, res, next) => {
    try {
        const { _id } = req.body
        const data = await User.findOne({ _id })
        res.json({
            success: true,
            data
        })
    } catch (err) {
        next(err)
    }
}

exports.getUnverifiedUsers = async(req, res, next) => {
    try {
        const data = await User.find({ verified: false }).populate('subjects', 'name')
        res.json({
            success: true,
            data
        })
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
            throw new Error('User not found!')
        if (!user.verified)
            throw new Error('Your account has not been verified yet!')
                // TODO: How to handle admin check
        if (await bcrypt.compare(password, user.password)) {
            const { _id } = user
            const token = jwt.sign({ _id }, process.env.JWT_SECRET, {
                //token expires in 3 days
                expiresIn: 4320,
            })
            res.json({
                success: true,
                token,
                data: {
                    _id: user._id,
                    name: user.name,
                    phoneNumber: user.phoneNumber,
                    subjects: user.subjects,
                    email: user.email,
                    ...(user.isAdmin && { isAdmin: true })
                }
            })

        }
    } catch (error) {
        res.json({
            error: true,
            message: error.message
        })
    }
}

exports.loginAdminUser = async(req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email, isAdmin: true })

        if (!user)
            throw new Error()
                // TODO: How to handle admin check
        if (await bcrypt.compare(password, user.password)) {
            const { _id } = user
            const token = jwt.sign({ _id }, process.env.JWT_SECRET, {
                //token expires in 3 days
                expiresIn: 4320,
            })
            res.json({
                success: true,
                token,
                data: {
                    _id: user._id,
                    name: user.name,
                    phoneNumber: user.phoneNumber,
                    subjects: user.subjects,
                    email: user.email,
                    ...(user.isAdmin && { isAdmin: true })
                }
            })

        } else
            throw new Error()
    } catch (error) {
        res.json({
            error: true,
            message: 'Account Not Found'
        })
    }
}

exports.approveUser = async(req, res) => {
    try {
        const { _id } = req.body
        const user = await User.updateOne({ _id }, { $set: { verified: true } })

        if (!user)
            throw new Error('User not found')
        res.json({
            success: true
        })

    } catch (error) {
        console.log(error)
        res.json({
            error: true,
            message: error
        })

    }
}

exports.unapproveUser = async(req, res) => {
    try {
        const { _id } = req.body
        const user = await User.deleteOne({ _id })

        if (!user)
            throw new Error('User not found')
        res.json({
            success: true
        })

    } catch (error) {
        console.log(error)
        res.json({
            error: true,
            message: error
        })

    }
}