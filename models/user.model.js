// add mongoose to connect database
const mongoose = require('mongoose');
// encryption password
const bcryptjs = require('bcryptjs');
// create a user
const Schema = mongoose.Schema;
var newUser = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstname: {
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
    avatar: {
        type: String
    },
    role: {
        type: String,
        enum: ['CEO/Manager', 'Staff'],
        default: 'Staff'
    },
    description: {
        type: String,
        default: null
    },
    active: {
        type: Boolean,
        default: false
    },
    createAt: {
        type: Date,
        default: Date.now()
    },
    updateAt: Date
})
// create encryption password
newUser.methods.createPass = function (pass) {
    return bcryptjs.hashSync(pass, bcryptjs.genSaltSync(10));
}
// compaer password
newUser.methods.comparePass = function (pass, repass) {
    return bcryptjs.compareSync(pass, repass);
}
// exports table users
module.exports = mongoose.model('users', newUser);