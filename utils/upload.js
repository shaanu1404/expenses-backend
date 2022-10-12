const multer = require('multer')
const path = require('path')
const fs = require('fs')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dirPath = path.join('media', 'profiles', String(req.user.id))
        fs.mkdirSync(dirPath, { recursive: true })
        cb(null, dirPath)
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname).toLowerCase()
        let filename = path.basename(file.originalname, ext)
        cb(null, filename + "-" + Date.now() + ext)
    },
})

const upload = multer({
    storage: storage,
    limits: { fileSize: 3 * 1024 * 1024 },
    fileFilter: function (req, file, cb) {
        var filetypes = /jpeg|jpg|png/;
        var mimetype = filetypes.test(file.mimetype);
        var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb("Error: File upload only supports the "
            + "following filetypes - " + filetypes);
    },
})

module.exports = {
    profileUpload: upload
}