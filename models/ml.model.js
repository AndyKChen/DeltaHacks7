const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const mlSchema = new Schema({
    username: {
        type: String
    },
    model: {
        type: Object
    } 
}, {
    timestamps: true
})

const ML = mongoose.model('User', mlSchema);

module.exports = ML;