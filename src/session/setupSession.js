const session = require('express-session');

module.exports = session({
    secret: process.env.SECRET_SESSION,
    saveUninitialized: true,
    resave: true,
    cookie: {
        maxAge: 99999999
    }
})