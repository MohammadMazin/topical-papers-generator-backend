const { Schema, model } = require('mongoose')

const QuestionTypeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
})

const questionTypeModel = model('questionType', QuestionTypeSchema)
module.exports = questionTypeModel