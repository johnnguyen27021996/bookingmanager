const router = require('express').Router();
const controller = require('../controllers/dashboard');

var islog = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/login');
    }
}

router.get('/', islog, controller.getDashboard);

module.exports = router;