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

router.get('/', islog, controller.getAllProfile);

router.get('/edit/:username', islog, controller.getProfile);

router.post('/edit/:username', islog, upload.single('avatar'), controller.postProfile);

router.get('/see/:username', islog, controller.seeOneProfile);

router.get('/delete/:id', islog, controller.deleteProfile);

router.get('/add', islog, controller.addProfile);

router.post('/add', islog, upload.single('avatar'), controller.addNewProfile);

module.exports = router;