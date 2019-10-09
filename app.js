// add framework EXPRESS
const express = require('express');
// path
const path = require('path');
// add .env file
const dotenv = require('dotenv').config();
// layout for webapp
const layout = require('express-layout');
// send data by method "POST"
const bodyParser = require('body-parser');
// cookie
const cookieParser = require('cookie-parser');
//session
const session = require('express-session');
//passport to login admin
const passport = require('passport');
// notice
const flash = require('connect-flash');
// init server
const app = express();

// connect database
const db = require('./src/database/db');
db();
// setup session
const sessionMiddleware = require('./src/session/setupSession');
// static file
app.use(express.static(path.join(__dirname, 'public')));
// set view
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// setup layout
app.use(layout());
// setup body-parser
app.use(bodyParser.json()); // file json body parser
app.use(bodyParser.urlencoded({ extended: false })) // false: int, array || true: others datatype
// setup cookie
app.use(cookieParser());
// setup session
app.use(sessionMiddleware);
// setup passport
app.use(passport.initialize());
app.use(passport.session());
// setup notice
app.use(flash());

// setup link to page
app.use('/login', require('./routers/login'));
app.use('/logout', require('./routers/logout'));
app.use('/dashboard', require('./routers/dashboard'));
app.use('/profile', require('./routers/profile'));

// const dbUser = require('./models/user.model');
// var newuser = new dbUser();
// newuser.username = 'admin';
// newuser.password = newuser.createPass('1');
// newuser.firstname = 'John';
// newuser.lastname = 'Nguyen';
// newuser.email = 'trung.nguyenthanh.2702@gmail.com';
// newuser.save();

// run server
app.listen(process.env.PORT || process.env.port, function () {
    console.log('Running ...');
})
// exports module
module.exports = app;