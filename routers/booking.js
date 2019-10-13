const router = require('express').Router();
const controller = require('../controllers/booking');

var islog = function(req, res, next){
    if(req.isAuthenticated()){
        next();
    }else{
        res.redirect('/login');
    }
}

// test booking tour
router.get('/test', controller.getFrontBooking);
router.post('/amounttour', controller.amountTour);
router.post('/amountservice', controller.amountService);
// test booking tour


router.get('/', islog, controller.getAllBooking);



module.exports = router;