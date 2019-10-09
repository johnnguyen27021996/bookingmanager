// add mongoose to connect database
const mongoose = require('mongoose');
// create a service
const Schema = mongoose.Schema;
var newService = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String
    },
    status: {
        type: Boolean,
        default: false
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
})
// exports table service
module.exports = mongoose.model('services', newService);