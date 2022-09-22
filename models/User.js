const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    //TODO: check if it needs ref of subjects
    subjects: {
        type: Array,
        required: true,
    },
    isAdmin: {
        type: Boolean,
    }
})

const userModel = model('user', UserSchema)
module.exports = userModel