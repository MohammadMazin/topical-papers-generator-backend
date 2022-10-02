const { Schema, model } = require('mongoose')

const TopicSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    subjectId: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: false,
        ref: 'subject'
    }
})

const topicModel = model('topic', TopicSchema)
module.exports = topicModel