// add mongoose to connect database
const mongoose = require('mongoose');
// create a booking
const Schema = mongoose.Schema;
var newBooking = new Schema({
    tourID: {
        type: Schema.Types.ObjectId,
        ref: 'tours',
        required: true
    },
    guestID: {
        type: Schema.Types.ObjectId,
        ref: 'guests',
        required: true
    },
    quanityAdult: {
        type: String
    },
    quanityChildren: {
        type: String
    },
    people: {
        type: String
    },
    serviceID: [
        {
            type: Schema.Types.ObjectId,
            ref: 'services',
        }
    ],
    amount: {
        type: String,
        required: true
    },
    note: {
        type: String
    },
    bookAt: {
        type: Date,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
})
// exports table booking
module.exports = mongoose.model('books', newBooking);