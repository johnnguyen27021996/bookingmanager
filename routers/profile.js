const router = require('express').Router();
const controller = require('../controllers/profile');

var islog = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/login');
    }
}

router.get('/:username', islog, controller.getProfile);

module.exports = router;