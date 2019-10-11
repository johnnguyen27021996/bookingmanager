const fs = require('fs');
const dbUser = require('../models/user.model');
const dbService = require('../models/service.model');

exports.getAllService = function (req, res) {
    dbService.find({}, function (err, doc) {
        dbUser.findOne({ username: req.user.username }, function (err, admin) {
            res.render('service/allservice', {
                layout: 'layout',
                title: 'All Service',
                services: doc,
                admin: admin
            })
        })
    })
}

// exports.getTour = function (req, res) {
//     let id = req.params.id;
//     dbTour.findById(id).exec(function (err, doc) {
//         dbUser.findOne({ username: req.user.username }, function (err, admin) {
//             res.render('tour/edittour', {
//                 layout: 'layout',
//                 title: 'Edit Tour',
//                 admin: admin,
//                 tour: doc
//             });
//         })
//     })
// }

// exports.postEditTour = function (req, res) {
//     let id = req.params.id;
//     let rb = req.body,
//         priceA = rb.priceA,
//         priceC = rb.priceC,
//         duration = rb.duration,
//         maxPeople = rb.maxpeople,
//         currency = rb.currency,
//         thumbnail = req.file,
//         description = rb.description;
//     dbTour.findById(id).exec(function (err, doc) {
//         if (priceA != '') {
//             doc.priceAdult = priceA;
//         }
//         if (priceC != '') {
//             doc.priceChildren = priceC;
//         }
//         if (duration != '') {
//             doc.duration = duration;
//         }
//         if (maxPeople != '') {
//             doc.maxPeople = maxPeople;
//         }
//         doc.currency = currency;
//         if (thumbnail != undefined) {
//             if (doc.thumbnail == '' || doc.thumbnail == undefined) {
//                 doc.thumbnail = req.file.filename;
//             } else {
//                 fs.unlink('public/img/tour/' + doc.thumbnail, function () { });
//                 doc.thumbnail = req.file.filename;
//             }
//         }
//         doc.description = description;
//         doc.save((err) => {
//             if (!err) {
//                 res.redirect('/tour');
//             }
//         })
//     })
// }

exports.deleteService = function (req, res) {
    var id = req.params.id;
    dbService.findByIdAndRemove(id).exec(function (err, doc) {
        if (doc.thumbnail != '') {
            fs.unlink('public/service/tour/' + doc.thumbnail, function () { })
        }
        res.redirect('/service');
    })
}

exports.addService = function (req, res) {
    res.render('service/addservice', {
        layout: 'layout',
        title: 'Add Service',
        admin: req.user,
        error: req.flash('error')
    });
}

exports.addNewService = function (req, res) {
    let rb = req.body,
        name = rb.name,
        price = rb.price,
        status = rb.status,
        thumbnail = req.file,
        currency = rb.currency,
        description = rb.description;
    dbService.findOne({ name: name }, function (err, doc) {
        if (doc) {
            req.flash('error', 'Service already exists');
            res.redirect('/service/add');
        } else {
            var newservice = new dbService();
            newservice.name = name;
            newservice.price = price;
            newservice.status = status;
            if (thumbnail != undefined) {
                newservice.thumbnail = req.file.filename;
            }
            newservice.currency = currency;
            newservice.description = description;
            newservice.save((err) => {
                if (!err) {
                    res.redirect('/service');
                }
            });
        }
    })
}