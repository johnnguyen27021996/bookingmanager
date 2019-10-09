const router = require('express').Router();
const controller = require('../controllers/dashboard');
const passport = require('../src/passport/passport');

router.get('/', controller.getAdmin);

module.exports = router;