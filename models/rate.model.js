// add mongoose to connect database
const mongoose = require('mongoose');
// create a rate
const Schema = mongoose.Schema;
var newRate = new Schema({
    star: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    tourID: {
        type: Schema.Types.ObjectId,
        ref: 'tours'
    },
    guestName: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
})
// exports table tour
module.exports = mongoose.model('rates', newRate);