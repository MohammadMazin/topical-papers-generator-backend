const { Schema, model } = require('mongoose')

const SavedPaperSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    name: {
        type: String,
        required: true
    },
    paperData: {
        type: Array,
        required: true,
        ref: 'question'
    },
    marks: {
        type: Number,
        required: true
    }
})

const savedPaperSchema = model('savedPaper', SavedPaperSchema)
module.exports = savedPaperSchema