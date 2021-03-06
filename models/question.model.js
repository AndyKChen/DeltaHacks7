const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const questionSchema = new Schema({
    category: {
        type: String
    },
    picture: {
        type: String
    },
    translation: {
        type: String
    }
}, {
    timestamps: true
})

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;