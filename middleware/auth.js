const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.verifyJWT = (req, res, next) => {
    const token = req.query.Authorization || req.get('Authorization')

    if (!token)
        res.send("No token Found")
    else {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err)
                res.json({ auth: false, message: "Authentication Failed" })
            else {
                req._id = decoded._id
                next()
            }
        })

    }
}

exports.adminAuth = async(req, res, next) => {
    try {
        const adminId = req.body.adminId
        if (!adminId)
            throw new Error("No User Id present. Cannot validate user!")
        const user = await User.findOne({ _id: adminId })
        if (!user.isAdmin)
            throw new Error("You are not an admin!")
        next()
    } catch (error) {
        res.send(error.message)
    }
}