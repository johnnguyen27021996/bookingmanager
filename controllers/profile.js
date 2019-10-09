const dbUser = require('../models/user.model');

exports.getProfile = function (req, res) {
    let username = req.params.username;
    dbUser.findOne({ username: username }, function (err, doc) {
        res.render('profile', {
            layout: 'layout',
            title: 'profile',
            admin: req.user,
            user: doc
        });
    })

}