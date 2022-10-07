const Topic = require('../models/Topic')
const Question = require('../models/Question')
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

exports.deleteTopic = async(req, res) => {
    try {
        const { _id } = req.body
        await Question.deleteMany({ topicId: _id })
        const newTopic = await Topic.deleteOne({ _id })
        res.json({
            success: true,
        })
    } catch (error) {
        res.json({
            error
        })
    }
}

exports.editTopic = async(req, res) => {
    try {
        const { _id, name, subjectId } = req.body
        const editTopic = await Topic.updateOne({ _id }, { $set: { name: name, subjectId: subjectId } })
        res.json({
            success: true,
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
        const data = await Topic.find({ subjectId })
        res.json({
            success: true,
            data
        })
    } catch (error) {
        res.json({
            error
        })
    }
}