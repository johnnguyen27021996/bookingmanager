const router = require('express').Router();
const controller = require('../controllers/logout');

router.get('/', controller.getLogout);

module.exports = router;