const dbBooking = require('../models/booking.model');
const dbUser = require('../models/user.model');
const dbGuest = require('../models/guest.model');
const dbTour = require('../models/tour.model');
const dbService = require('../models/service.model');

exports.getAllBooking = function (req, res) {
    let limit = 5, skip = 0;
    let page = req.params.page;
    skip = limit * page;
    let totalpage = 0;
    dbBooking.find({}).populate('tourID').populate('guestID').populate('serviceID').limit(limit).skip(skip).exec(function (err, doc) {
        dbUser.findOne({ username: req.user.username }, function (err, admin) {
            dbBooking.countDocuments({}, function (err, count) {
                totalpage = count;
                let pagination = Math.ceil(totalpage / limit);
                res.render('booking/allbooking', {
                    layout: 'layout',
                    title: 'All Booking',
                    admin: admin,
                    books: doc,
                    pagination: pagination
                })
            })
        })
    })
}

exports.addBooking = function (req, res) {
    var rb = req.body,
        firstname = rb.firstname,
        lastname = rb.lastname,
        email = rb.email,
        tourID = rb.tour,
        adult = rb.adult,
        children = rb.children,
        people = parseInt(adult) + parseInt(children),
        service = rb.service,
        bookat = rb.bookat,
        amount = rb.amount,
        note = rb.note;
    var timenow = Date.now();
    var date = new Date(bookat);
    var year = date.getFullYear(),
        month = date.getMonth(),
        day = date.getDate(),
        later = parseInt(day) + 1;
    var datelater = new Date(year, month, later);
    if (amount == 0 || amount == '' || date <= timenow) {
        req.flash('error', 'Error Booking');
        res.redirect('/booking/test');
    } else {
        var totalpeople = 0, maxpeople = 20;
        dbBooking.find({ bookAt: { '$gte': date, '$lt': datelater } }).exec(function (err, doc) {
            doc.forEach(book => {
                totalpeople += parseInt(book.people);
            })
            totalpeople += parseInt(people);
            if (totalpeople > maxpeople) {
                req.flash('error', 'Larger number of people more than 20');
                res.redirect('/booking/test');
            } else {
                var newguest = new dbGuest({
                    firstname: firstname,
                    lastname: lastname,
                    email: email
                });
                newguest.save((err) => {
                    if (!err) {
                        dbGuest.find({}).sort({ _id: -1 }).limit(1).exec(function (err, guest) {
                            dbTour.findById(tourID).exec(function (err, tour) {
                                dbService.find({}, function (err, services) {
                                    var newbooking = new dbBooking();
                                    newbooking.tourID = tour._id;
                                    newbooking.guestID = guest[0]['_id'];
                                    newbooking.quanityAdult = adult;
                                    newbooking.quanityChildren = children;
                                    newbooking.people = people;
                                    if (service != undefined) {
                                        if (typeof (service) === 'string') {
                                            newbooking.serviceID.push(service);
                                        } else {
                                            services.forEach(item1 => {
                                                service.forEach(item2 => {
                                                    if (item1._id == item2) {
                                                        newbooking.serviceID.push(item1._id);
                                                    }
                                                })
                                            })
                                        }
                                    }
                                    newbooking.amount = amount;
                                    if (note != '') {
                                        newbooking.note = note;
                                    }
                                    newbooking.bookAt = bookat;
                                    newbooking.save((err) => {
                                        if (!err) {
                                            req.flash('error', 'Booking Success');
                                            res.redirect('/booking/test');
                                        }
                                    })
                                })
                            })
                        })
                    }
                })
            }
        })
    }
}

exports.deleteBooking = function (req, res) {
    var tourID = req.params.id;
    dbBooking.findByIdAndDelete(tourID).exec(function (err, doc) {
        dbGuest.findByIdAndDelete(doc.guestID).exec(function (err, doc1) {
            res.redirect('/booking');
        })
    })
}



////////////////////
// CALENDAR BOOKING
exports.getCalendarBooking = function (req, res) {
    dbUser.findOne({ username: req.user.username }, function (err, admin) {
        res.render('booking/calendar', {
            layout: 'layout',
            title: 'Calender Booking',
            admin: admin
        })
    })
}
exports.postCalendarBooking = function (req, res) {
    dbBooking.find({}).populate('tourID').populate('guestID').populate('serviceID').exec(function (err, doc) {
        res.send(doc);
    })
}
exports.postBookingDay = function (req, res) {
    var day = req.body.day,
        month = req.body.month,
        year = req.body.year,
        laterday = parseInt(day) + 1;
    var bookingday = new Date(year, month, day);
    var bookingdaylater = new Date(year, month, laterday);
    dbBooking.find({ bookAt: { '$gte': bookingday, '$lt': bookingdaylater } }).populate('tourID').populate('guestID').populate('serviceID').exec(function (err, doc) {
        res.send(doc);
    })
}
// CALENDAR BOOKING
////////////////////


///////////////////
// TEST BOOKING //
// Load interface to booking
exports.getFrontBooking = function (req, res) {
    dbTour.find({}, function (err, tour) {
        dbService.find({}, function (err, service) {
            res.render('testbooking', {
                layout: false,
                tours: tour,
                services: service,
                error: req.flash('error')
            })
        })
    })
}
exports.amountTour = function (req, res) {
    var tourID = req.body.id,
        adult = req.body.adult,
        children = req.body.children;
    var amount = 0;
    dbTour.findById(tourID).exec(function (err, doc) {
        if (doc.currency == 'VND') {
            amount = Math.round((parseFloat(doc.priceAdult * adult) + parseFloat(doc.priceChildren * children)) / 23000, 1);
        } else {
            amount = parseFloat(doc.priceAdult * adult) + parseFloat(doc.priceChildren * children);
        }
        res.send(JSON.stringify(amount));
    })
}
exports.amountService = function (req, res) {
    var tourID = req.body.id,
        adult = req.body.adult,
        children = req.body.children,
        service = req.body.service;
    var amountService = amountTour = amount = 0;
    dbTour.findById(tourID).exec(function (err, tour) {
        dbService.find({}, function (err, doc) {
            if (doc.currency == 'VND') {
                amountTour = Math.round((parseFloat(tour.priceAdult * adult) + parseFloat(tour.priceChildren * children)) / 23000, 1);
            } else {
                amountTour = parseFloat(tour.priceAdult * adult) + parseFloat(tour.priceChildren * children);
            }
            doc.forEach(item1 => {
                service.forEach(item2 => {
                    if (item1._id == item2) {
                        if (item1.currency == 'VND') {
                            amountService += Math.round(parseFloat(item1.price / 23000), 1);
                        } else {
                            amountService += parseFloat(item1.price)
                        }
                    }
                })
            })
            amount = amountTour + amountService;
            res.send(JSON.stringify(amount));
        })
    })
}
// TEST BOOKING //
///////////////////