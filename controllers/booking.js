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
        amount = parseFloat(doc.priceAdult*adult) + parseFloat(doc.priceChildren*children);
        res.send(JSON.stringify(amount));
    })
}
exports.amountService = function(req, res){
    var service = req.body.service;
    var amount = 0;
    dbService.find({}, function(err, doc){
        doc.forEach(item1 => {
            service.forEach( item2 => {
                if(item1._id == item2){
                    if(item1.currency == 'VND'){
                        amount += Math.round(parseFloat(item1.price/23000), 1);
                    }else{
                        amount += parseFloat(item1.price)
                    }
                }
            })
        })
        res.send(JSON.stringify(amount));
    })
}
// TEST BOOKING //
///////////////////