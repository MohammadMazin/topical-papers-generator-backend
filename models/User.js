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
    subjects: {
        type: Array,
        required: true,
        ref: 'subject',
        default: []
    },
    isAdmin: {
        type: Boolean,
    },
    verified: {
        type: Boolean,
        default: false
    },
    paid: {
        type: Boolean,
        default: false
    }
})

const userModel = model('user', UserSchema)
module.exports = userModel