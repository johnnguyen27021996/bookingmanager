const router = require('express').Router();
const controller = require('../controllers/guest');

var islog = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/login');
    }
}

router.get('/', islog, controller.getAllGuest);

router.get('/p=:page?', islog, controller.getAllGuest);

router.get('/edit/:id', islog, controller.getEditGuest);

router.post('/edit/:id', islog, controller.postEditGuest);

module.exports = router;