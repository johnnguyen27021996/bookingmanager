const fs = require('fs');
const dbUser = require('../models/user.model');
const dbTour = require('../models/tour.model');

exports.getAllTour = function (req, res) {
    dbTour.find({}, function (err, doc) {
        dbUser.findOne({ username: req.user.username }, function (err, admin) {
            res.render('tour/alltour', {
                layout: 'layout',
                title: 'All Tour',
                tours: doc,
                admin: admin
            })
        })
    })
}

exports.getTour = function (req, res) {
    let id = req.params.id;
    dbTour.findById(id).exec(function (err, doc) {
        dbUser.findOne({ username: req.user.username }, function (err, admin) {
            res.render('tour/edittour', {
                layout: 'layout',
                title: 'Edit Tour',
                admin: admin,
                tour: doc
            });
        })
    })
}

exports.postEditTour = function (req, res) {
    let id = req.params.id;
    let rb = req.body,
        priceA = rb.priceA,
        priceC = rb.priceC,
        duration = rb.duration,
        maxPeople = rb.maxpeople,
        currency = rb.currency,
        thumbnail = req.file,
        description = rb.description;
    dbTour.findById(id).exec(function (err, doc) {
        if (priceA != '') {
            doc.priceAdult = priceA;
        }
        if (priceC != '') {
            doc.priceChildren = priceC;
        }
        if (duration != '') {
            doc.duration = duration;
        }
        if (maxPeople != '') {
            doc.maxPeople = maxPeople;
        }
        doc.currency = currency;
        if (thumbnail != undefined) {
            if (doc.thumbnail == '' || doc.thumbnail == undefined) {
                doc.thumbnail = req.file.filename;
            } else {
                fs.unlink('public/img/tour/' + doc.thumbnail, function () { });
                doc.thumbnail = req.file.filename;
            }
        }
        doc.description = description;
        doc.save((err) => {
            if (!err) {
                res.redirect('/tour');
            }
        })
    })
}

exports.deleteTour = function (req, res) {
    var id = req.params.id;
    dbTour.findByIdAndRemove(id).exec(function (err, doc) {
        if (doc.thumbnail != '') {
            fs.unlink('public/img/tour/' + doc.thumbnail, function () { })
        }
        res.redirect('/tour');
    })
}

exports.addTour = function (req, res) {
    res.render('tour/addtour', {
        layout: 'layout',
        title: 'Add Tour',
        admin: req.user,
        error: req.flash('error')
    });
}

exports.addNewTour = function (req, res) {
    let rb = req.body,
        name = rb.name,
        priceA = rb.priceA,
        priceC = rb.priceC,
        duration = rb.duration,
        maxPeople = rb.maxpeople,
        thumbnail = req.file,
        currency = rb.currency,
        description = rb.description;
    dbTour.findOne({ name: name }, function (err, doc) {
        if (doc) {
            req.flash('error', 'Tour already exists');
            res.redirect('/tour/add');
        } else {
            var newtour = new dbTour();
            newtour.name = name;
            newtour.priceAdult = priceA;
            newtour.priceChildren = priceC;
            newtour.duration = duration;
            newtour.maxPeople = maxPeople;
            if (thumbnail != undefined) {
                newtour.thumbnail = req.file.filename;
            }
            newtour.currency = currency;
            newtour.description = description;
            newtour.save((err) => {
                if (!err) {
                    res.redirect('/tour');
                }
            });
        }
    })
}