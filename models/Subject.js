const { Schema, model } = require('mongoose')

const SubjectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    boardId: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: false,
        ref: 'board'
    },
    subjectCategoryId: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: false,
        ref: 'subjectCategory'
    }
})
const subjectModel = model('subject', SubjectSchema)
module.exports = subjectModel