const fs = require('fs');
const dbUser = require('../models/user.model');

exports.getAllProfile = function (req, res) {
    let limit = 5, skip = 0;
    let page = req.params.page;
    skip = limit * page;
    let totalpage = 0;
    dbUser.find({}).limit(limit).skip(skip).exec(function (err, doc) {
        dbUser.findOne({ username: req.user.username }, function (err, admin) {
            dbUser.countDocuments({}, function (err, count) {
                totalpage = count;
                let pagination = Math.ceil(totalpage / limit);
                res.render('profile/allprofile', {
                    layout: 'layout',
                    title: 'All Profile',
                    users: doc,
                    admin: admin,
                    pagination: pagination
                })
            })
        })
    })
}

exports.getProfile = function (req, res) {
    let username = req.params.username;
    dbUser.findOne({ username: username }, function (err, doc) {
        dbUser.findOne({ username: req.user.username }, function (err, admin) {
            var createat = doc.createAt.toLocaleDateString();
            res.render('profile/profile', {
                layout: 'layout',
                title: 'Profile',
                admin: admin,
                user: doc,
                date: createat
            });
        })
    })
}

exports.postProfile = function (req, res) {
    let username = req.params.username;
    let rb = req.body,
        email = rb.email,
        firstname = rb.firstname,
        lastname = rb.lastname,
        phone = rb.phone,
        country = rb.country,
        active = rb.active,
        avatar = req.file,
        description = rb.description;
    dbUser.findOne({ username: username }, function (err, doc) {
        if (email != '') {
            doc.email = email;
        }
        if (firstname != '') {
            doc.firstname = firstname;
        }
        if (lastname != '') {
            doc.lastname = lastname;
        }
        if (phone != '') {
            doc.phone = phone
        }
        if (country != '') {
            doc.country = country;
        }
        doc.active = active;
        if (avatar != undefined) {
            avatar = req.file.filename;
            if (doc.avatar == 'default-avatar.png') {
                doc.avatar = avatar;
            } else {
                fs.unlink('public/img/user/' + doc.avatar, function () { });
                doc.avatar = avatar;
            }
        }
        doc.description = description;
        doc.save((err) => {
            if (!err) {
                res.redirect('/profile');
            }
        });
    })
}

exports.seeOneProfile = function (req, res) {
    let username = req.params.username;
    dbUser.findOne({ username: username }, function (err, doc) {
        dbUser.findOne({ username: req.user.username }, function (err, admin) {
            var createat = doc.createAt.toLocaleDateString();
            res.render('profile/seeoneprofile', {
                layout: 'layout',
                title: 'See Profile',
                admin: admin,
                user: doc,
                date: createat
            });
        })
    })
}

exports.deleteProfile = function (req, res) {
    var id = req.params.id;
    dbUser.findByIdAndRemove(id).exec(function (err, doc) {
        if (doc.avatar != 'default-avatar.png') {
            fs.unlink('public/img/user/' + doc.avatar, function () { })
        }
        res.redirect('/profile');
    })
}

exports.addProfile = function (req, res) {
    res.render('profile/addprofile', {
        layout: 'layout',
        title: 'Add Profile',
        admin: req.user,
        error: req.flash('error')
    });
}

exports.addNewProfile = function (req, res) {
    let rb = req.body,
        username = rb.username,
        password = rb.password,
        email = rb.email,
        firstname = rb.firstname,
        lastname = rb.lastname,
        phone = rb.phone,
        country = rb.country,
        active = rb.active,
        avatar = req.file,
        description = rb.description;
    dbUser.findOne({ username: username }, function (err, doc) {
        if (doc) {
            req.flash('error', 'Account already exists');
            res.redirect('/profile/add');
        } else {
            dbUser.findOne({ email: email }, function (err, doc1) {
                if (doc1) {
                    req.flash('error', 'Email already exists');
                    res.redirect('/profile/add');
                } else {
                    var newuser = new dbUser();
                    newuser.username = username;
                    newuser.password = newuser.createPass(password);
                    newuser.firstname = firstname;
                    newuser.lastname = lastname;
                    newuser.email = email;
                    newuser.phone = phone;
                    newuser.country = country;
                    newuser.active = active;
                    if (avatar != undefined) {
                        newuser.avatar = req.file.filename;
                    }
                    newuser.description = description;
                    newuser.save((err) => {
                        if (!err) {
                            res.redirect('/profile');
                        }
                    });
                }
            })
        }
    })
}