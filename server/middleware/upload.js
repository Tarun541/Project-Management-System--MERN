const multer = require('multer')
const path = require('path')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext)
    }
})

var upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        if (file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'application/pdf' || file.mimetype === "application/msword" ||
            file.mimetype != 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.mimetype == ' file / pdf') {
            callback(null, true)
        } else {
            console.log('only jpg & png file supported!');
            callback(null, false)
        }
    }
})

module.exports = upload;