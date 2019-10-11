// add mongoose to connect database
const mongoose = require('mongoose');
// create a tour
const Schema = mongoose.Schema;
var newTour = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    priceAdult: {
        type: String,
        required: true
    },
    priceChildren: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    duration: {
        type: String
    },
    maxPeople: {
        type: String,
    },
    thumbnail: {
        type: String
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
})
// exports table tour
module.exports = mongoose.model('tours', newTour);