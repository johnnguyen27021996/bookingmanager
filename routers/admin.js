const router = require('express').Router();
const controller = require('../controllers/admin');
const passport = require('../src/passport/passport');

router.get('/', controller.getAdmin);

module.exports = router;