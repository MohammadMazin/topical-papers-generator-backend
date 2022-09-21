const { Schema, model } = require('mongoose')

const SubjectCategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },

})
const subjectCategoryModel = model('subjectCategory', SubjectCategorySchema)
module.exports = subjectCategoryModel