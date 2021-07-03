const path = require('path')
const multer = require('multer')

const UPLOAD_DIR = path.resolve(process.env.UPLOAD_DIR)
const AVATARS_DIR = path.resolve(process.env.AVATARS_DIR)

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({
  storage: storage,
  limits: { fileSize: 2000000 },
  fileFilter: (req, file, cb) => {
    console.log('file: ', file)
    console.log('file.mimetype', file.mimetype)
    if (file.mimetype.includes('image')) {
      cb(null, true)
      return
    }
    cb(null, false)
  }
})

module.exports = { upload, UPLOAD_DIR, AVATARS_DIR }
