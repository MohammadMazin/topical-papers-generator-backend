const { Schema, model } = require('mongoose')

const QuestionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    question: {
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