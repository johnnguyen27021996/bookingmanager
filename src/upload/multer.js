function upload(directory_url) {
    const multer = require('multer');

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, directory_url);
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '.' + file.originalname);
        }
    })

    var newupload = multer({ storage: storage });

    return newupload;
}
module.exports = upload;