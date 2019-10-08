const dbUser = require('../models/user.model');

exports.getLogin = function (req, res) {
    res.render('login', {
        error: req.flash('error')
    });
}

exports.postLogin = function(req, res){
    res.redirect('/admin');
}