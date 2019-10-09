const dbUser = require('../models/user.model');

exports.getDashboard = function (req, res) {
    res.render('dashboard', {
        layout: 'layout',
        title: 'Dashboard',
        admin: req.user
    });
}