// add mongoose to connect database
const mongoose = require('mongoose');
// create a guest
const Schema = mongoose.Schema;
var newGuest = new Schema({
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
    country: {
        type: String,
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
})
// exports table guests
module.exports = mongoose.model('guests', newGuest);