const dbUser = require('../models/user.model');

exports.getLogout = function (req, res) {
    req.logout();
    res.redirect('/login');
}