const Topic = require('../models/Topic')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.getAllTopics = async(req, res, next) => {
    try {
        const data = await Topic.find().populate('subjectId', 'name')
        res.json({
            success: true,
            data
        })
    } catch (err) {
        next(err)
    }
}

exports.addTopic = async(req, res) => {
    try {
        const { name, subjectId } = req.body
        const newTopic = await Topic.create({ name, subjectId })
        res.json({
            success: true,
            data: newTopic
        })
    } catch (error) {
        res.json({
            error
        })
    }
}

exports.getTopicsOfSubject = async(req, res) => {
    try {
        const { subjectId } = req.body
        const data = await Topic.find({subjectId})
        res.json({
            success:true,
            data
        })
    } catch (error) {
        res.json({
            error
        })
    }
}