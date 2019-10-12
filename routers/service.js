const router = require('express').Router();
const controller = require('../controllers/service');
const upload = require('../src/upload/multer')(process.env.FOLDER_IMG_SERVICE);

var islog = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/login');
    }
}

router.get('/(:page)?', islog, controller.getAllService);

router.get('/edit/:id', islog, controller.getEditService);

router.post('/edit/:id', islog, upload.single('thumbnail'), controller.postEditService);

router.get('/delete/:id', islog, controller.deleteService);

router.get('/add', islog, controller.addService);

router.post('/add', islog, upload.single('thumbnail'), controller.addNewService);

module.exports = router;