const router = require('express').Router();
const controller = require('../controllers/booking');

router.get('/', controller.getAllBooking);

module.exports = router;