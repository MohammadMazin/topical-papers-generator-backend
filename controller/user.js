const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//TODO: hide password when sent in response
exports.getAllUsers = async(req, res, next) => {
    try {
        const data = await User.find({}, { password: 0 })
        res.json({
            success: true,
            data
        })
    } catch (err) {
        next(err)
    }
}
exports.getVerifiedUsers = async(req, res, next) => {
    try {
        const data = await User.find({ verified: true }, { password: 0 }).populate('subjects', 'name')
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
        const data = await User.findOne({ _id }).populate('subjects', 'name')
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
        const oldUserEmail = await User.findOne({ email })
        if (oldUserEmail)
            throw new Error("User With this email already Exists")
        const oldUserUsername = await User.findOne({ username })
        if (oldUserUsername)
            throw new Error("User With this username already Exists")

        const salt = await bcrypt.genSalt()
        const hashedPasword = await bcrypt.hash(password, salt)
        const newUser = await User.create({ username, email, password: hashedPasword, name, phoneNumber, dateOfBirth, subjects, isAdmin })
        res.json({
            success: true,
            data: newUser
        })
    } catch (error) {
        res.json({
            error: true,
            message: error.message
        })
    }
}

exports.changePassword = async(req, res) => {
    try {
        const { _id, oldPass, newPass } = req.body
        const user = await User.findOne({ _id })

        if (!user)
            throw new Error('User ID invalid')

        if (await bcrypt.compare(oldPass, user.password)) {
            const salt = await bcrypt.genSalt()
            const hashedPasword = await bcrypt.hash(newPass, salt)
            const updatedPassword = await User.updateOne({ _id }, { password: hashedPasword })
        } else
            throw new Error('Old Password was entered incorrectly')
        res.json({
            success: true,
        })

    } catch (error) {
        res.json({
            error: true,
            message: error.message
        })
    }
}

exports.deleteUser = async(req, res) => {
    try {
        const { _id } = req.body
        const user = User.deleteOne({ _id })
        if (!user)
            throw new Error('User not found')
        res.json({
            success: true,
        })
    } catch (error) {
        res.json({
            error: true,
            message: error.message
        })
    }
}

exports.setUserPaidStatus = async(req, res) => {
    try {
        const { _id, paid } = req.body
        const data = await User.updateOne({ _id }, { $set: { paid: paid } })
        if (!data)
            throw new Error('User not found')
        res.json({
            success: true
        })
    } catch (error) {
        res.json({
            error: true,
            message: error
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
        } else
            throw new Error('Incorrect Password entered')
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
            throw new Error('User not found')
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
            throw new Error('Incorrect Password entered')
    } catch (error) {
        res.json({
            error: true,
            message: error.message
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
        res.json({
            error: true,
            message: error
        })

    }
}

exports.createAdmin = async(req, res) => {
    try {

        const { name, username, email, password, phoneNumber, dateOfBirth } = req.body

        const oldUserEmail = await User.findOne({ email, isAdmin: true })
        if (oldUserEmail)
            throw new Error("Admin With this email already Exists")
        const oldUserUsername = await User.findOne({ username, isAdmin: true })
        if (oldUserUsername)
            throw new Error("Admin With this username already Exists")

        const salt = await bcrypt.genSalt()
        const hashedPasword = await bcrypt.hash(password, salt)
        const newAdmin = await User.create({ name, username, email, password: hashedPasword, phoneNumber, dateOfBirth, subjects: [], isAdmin: true, verified: true })
        res.json({
            success: true,
            data: newAdmin
        })

    } catch (error) {
        res.json({
            error: true,
            message: error.message
        })
    }
}