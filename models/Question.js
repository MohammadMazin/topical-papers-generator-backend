const { Schema, model } = require('mongoose')

const QuestionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: Array,
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
    year: {
        type: Number,
        required: true
    },
    month: {
        type: String,
        required: true
    },
    variant: {
        type: Number,
        required: true
    },
    courseId: {
        type: Array,
        required: true
    },
    topicId: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: false,
        ref: 'topic'
    },
    questionTypeId: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: false,
        ref: 'questionType'
    },
    boardId: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: false,
        ref: 'board'
    },
    levelId: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: false,
        ref: 'level'
    },
    subjectId: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: false,
        ref: 'subject'
    },
    paid: {
        type: Number,
        default: 0,
        required: true
    },
})
const questionModel = model('question', QuestionSchema)
module.exports = questionModel