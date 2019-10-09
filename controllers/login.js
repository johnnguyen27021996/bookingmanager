const dbUser = require('../models/user.model');

exports.getLogin = function (req, res) {
    res.render('login', {
        layout: false,
        error: req.flash('error')
    });
}

exports.postLogin = function(req, res){
    res.redirect('/dashboard');
}