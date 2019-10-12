const dbBooking = require('../models/booking.model');
const dbUser = require('../models/user.model');
// const dbGuest = require('../models/guest.model');
// const dbTour = require('../models/tour.model');
// const dbService = require('../models/service.model');

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