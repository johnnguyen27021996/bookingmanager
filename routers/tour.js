const router = require('express').Router();
const controller = require('../controllers/tour');
const upload = require('../src/upload/multer')('public/img/tour/');

var islog = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/login');
    }
}

router.get('/', islog, controller.getAllTour);

router.get('/edit/:id', islog, controller.getTour);

router.post('/edit/:id', islog, upload.single('thumbnail'), controller.postEditTour);

router.get('/delete/:id', islog, controller.deleteTour);

router.get('/add', islog, controller.addTour);

router.post('/add', islog, upload.single('thumbnail'), controller.addNewTour);

module.exports = router;