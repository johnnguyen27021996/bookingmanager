const dbUser = require('../models/user.model');

exports.getProfile = function (req, res) {
    let username = req.params.username;
    // dbUser.findOne({ username: username }, function (err, doc) {
    //     var createat = doc.createAt.toLocaleDateString();
    //     res.render('profile', {
    //         layout: 'layout',
    //         title: 'profile',
    //         admin: req.user,
    //         user: doc,
    //         date: createat
    //     });
    // })

    dbUser.find({username: {$ne : username}}, function(err, doc){
        console.log(doc);
    })

}