const Topic = require('../models/Topic')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//TODO: hide password when sent in response
exports.getAllTopics = async(req, res, next) => {
    try {
        const data = await Topic.find()
        res.json({
            success: true,
            data
        })
    } catch (err) {
        next(err)
    }
}

exports.addTopic = async(req, res, next) => {
    // TODO: Handle Subjects field for admin
    try {
        const { name } = req.body
        const newUser = await Topic({ name })
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