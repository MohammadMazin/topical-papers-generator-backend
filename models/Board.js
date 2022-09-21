const { Schema, model } = require('mongoose')

const BoardSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
})

const boardModel = model('board', BoardSchema)
module.exports = boardModel