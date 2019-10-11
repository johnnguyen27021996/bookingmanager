const router = require('express').Router();
const controller = require('../controllers/profile');
const upload = require('../src/upload/multer')('public/img/user/');

var islog = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/login');
    }
}

router.get('/:username', islog, controller.getProfile);

router.post('/edit/:username', islog, upload.single('avatar'), controller.postProfile);

module.exports = router;