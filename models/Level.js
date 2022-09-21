const { Schema, model } = require('mongoose')

const LevelSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    boardId: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: false,
        ref: 'board'
    }
})
const levelModel = model('level', LevelSchema)
module.exports = levelModel