const { Schema, model } = require('mongoose')

const QuestionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    // TODO: Check if it stores HTML properly
    description: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    marks: {
        type: Number,
        required: true
    },
    questionTypeId: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: false,
        ref: 'questionType'
    }
})
const questionModel = model('question', QuestionSchema)
module.exports = questionModel