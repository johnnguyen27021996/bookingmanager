const dbUser = require('../models/user.model');

exports.getAdmin = function (req, res) {
    res.render('admin');
}