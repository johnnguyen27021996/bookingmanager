// add mongoose to connect database
const mongoose = require('mongoose');
// create a country
const Schema = mongoose.Schema;
var newCountry = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
})
// exports table tour
module.exports = mongoose.model('countries', newCountry);