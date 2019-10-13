const dbBooking = require('../models/booking.model');
const dbUser = require('../models/user.model');
const dbGuest = require('../models/guest.model');
const dbTour = require('../models/tour.model');
const dbService = require('../models/service.model');

exports.getAllBooking = function(req, res){
    dbBooking.find({}).populate('guestID', 'tourID', 'serviceID').exec(function(err, doc){
        dbUser.findOne({username: req.user.username}, function(err, admin){
            res.render('boooking/allbooking', {
                layout: 'layout',
                title: 'All Booking',
                admin: admin,
                books: doc
            })
        })
    })
}






///////////////////
// TEST BOOKING //
// Load interface to booking
exports.getFrontBooking = function(req, res){
    dbTour.find({}, function(err, tour){
        dbService.find({}, function(err, service){
            res.render('testbooking', {
                layout: false,
                tours: tour,
                services: service
            })
        })
    })
}
exports.amountTour = function(req, res){
    var tourID = req.body.id,
        adult = req.body.adult,
        children = req.body.children;
    var amount = 0;
    dbTour.findById(tourID).exec(function(err, doc){
        if(doc.currency == 'VND'){
            amount = Math.round((parseFloat(doc.priceAdult*adult) + parseFloat(doc.priceChildren*children))/23000, 1);
        }else{
            amount = parseFloat(doc.priceAdult*adult) + parseFloat(doc.priceChildren*children);
        }
        res.send(JSON.stringify(amount));
    })
}
exports.amountService = function(req, res){
    var tourID = req.body.id,
        adult = req.body.adult,
        children = req.body.children,
        service = req.body.service;
    var amountService = amountTour = amount = 0;
    dbTour.findById(tourID).exec(function(err, tour){
        dbService.find({}, function(err, doc){
            if(doc.currency == 'VND'){
                amountTour = Math.round((parseFloat(tour.priceAdult*adult) + parseFloat(tour.priceChildren*children))/23000, 1);
            }else{
                amountTour = parseFloat(tour.priceAdult*adult) + parseFloat(tour.priceChildren*children);
            }
            doc.forEach(item1 => {
                service.forEach( item2 => {
                    if(item1._id == item2){
                        if(item1.currency == 'VND'){
                            amountService += Math.round(parseFloat(item1.price/23000), 1);
                        }else{
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