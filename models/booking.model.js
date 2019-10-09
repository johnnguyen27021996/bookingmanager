// add mongoose to connect database
const mongoose = require('mongoose');
// create a booking
const Schema = mongoose.Schema;
var newBooking = new Schema({
    firtname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    active: {
        type: Boolean,
        default: false
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
})
// exports table booking
module.exports = mongoose.model('books', newBooking);