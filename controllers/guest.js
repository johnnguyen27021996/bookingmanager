const dbGuest = require('../models/guest.model');
const dbUser = require('../models/user.model');

exports.getAllGuest = function (req, res) {
    let limit = 5, skip = 0;
    let page = req.params.page;
    skip = limit * page;
    let totalpage = 0;
    dbGuest.find({}).limit(limit).skip(skip).exec(function (err, doc) {
        dbUser.findOne({ username: req.user.username }, function (err, admin) {
            dbGuest.countDocuments({}, function (err, count) {
                totalpage = count;
                let pagination = Math.ceil(totalpage / limit);
                res.render('guest/allguest', {
                    layout: 'layout',
                    title: 'All Guest',
                    admin: admin,
                    guests: doc,
                    pagination: pagination
                })
            })
        })
    })
}

exports.getEditGuest = function (req, res) {
    var guestID = req.params.id;
    dbGuest.findById(guestID).exec(function (err, doc) {
        dbUser.findOne({ username: req.user.username }, function (err, admin) {
            var createat = doc.createAt.toString();
            res.render('guest/editguest', {
                layout: 'layout',
                title: 'Edit Guest',
                admin: admin,
                guest: doc,
                date: createat
            });
        })
    })
}

exports.postEditGuest = function (req, res) {
    var rb = req.body,
        guestID = req.params.id,
        email = rb.email,
        phone = rb.phone,
        country = rb.country,
        passport = rb.passport;
    dbGuest.findById(guestID).exec(function (err, doc) {
        if (email != '') {
            doc.email = email;
        }
        if (country != '') {
            doc.country = country;
        }
        if (phone != '') {
            doc.phone = phone;
        }
        if (passport != '') {
            doc.passport = passport;
        }
        doc.save((err) => {
            if (!err) {
                res.redirect('/guest');
            }
        })
    })
}