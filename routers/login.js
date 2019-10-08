const router = require('express').Router();
const controller = require('../controllers/login');
const passport = require('../src/passport/passport');

router.get('/', controller.getLogin);

router.post('/', passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
}), controller.postLogin);

module.exports = router;