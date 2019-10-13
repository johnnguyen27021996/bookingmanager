const fs = require('fs');
const dbUser = require('../models/user.model');
const dbService = require('../models/service.model');

exports.getAllService = function (req, res) {
    let limit = 5, skip = 0;
    let page = req.params.page;
    skip = limit * page;
    let totalpage = 0;
    dbService.find({}).limit(limit).skip(skip).exec(function (err, doc) {
        dbUser.findOne({ username: req.user.username }, function (err, admin) {
            dbService.countDocuments({}, function (err, count) {
                totalpage = count;
                let pagination = Math.ceil(totalpage / limit);
                res.render('service/allservice', {
                    layout: 'layout',
                    title: 'All Service',
                    services: doc,
                    admin: admin,
                    pagination: pagination
                })
            })
        })
    })
}

exports.getEditService = function (req, res) {
    let id = req.params.id;
    dbService.findById(id).exec(function (err, doc) {
        dbUser.findOne({ username: req.user.username }, function (err, admin) {
            res.render('service/editservice', {
                layout: 'layout',
                title: 'Edit Service',
                admin: admin,
                service: doc
            });
        })
    })
}

exports.postEditService = function (req, res) {
    let id = req.params.id;
    let rb = req.body,
        price = rb.price,
        status = rb.status,
        currency = rb.currency,
        thumbnail = req.file,
        description = rb.description;
    dbService.findById(id).exec(function (err, doc) {
        if (price != '') {
            doc.price = price;
        }
        doc.status = status;
        doc.currency = currency;
        if (thumbnail != undefined) {
            if (doc.thumbnail == '' || doc.thumbnail == undefined) {
                doc.thumbnail = req.file.filename;
            } else {
                fs.unlink('public/img/service/' + doc.thumbnail, function () { });
                doc.thumbnail = req.file.filename;
            }
        }
        doc.description = description;
        doc.save((err) => {
            if (!err) {
                res.redirect('/service');
            }
        })
    })
}

exports.deleteService = function (req, res) {
    var id = req.params.id;
    dbService.findByIdAndDelete(id).exec(function (err, doc) {
        if (doc.thumbnail != '') {
            fs.unlink('public/img/service/' + doc.thumbnail, function () { })
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