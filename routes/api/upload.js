const express = require('express')
const router = express.Router()

const path = require('path')
const fs = require('fs').promises
const jimp = require('jimp')
const multer = require('multer')
const UPLOAD_DIR = path.resolve(process.env.UPLOAD_DIR)
const AVATARS_DIR = path.resolve(process.env.AVATARS_DIR)
console.log('AVATARS_DIR', AVATARS_DIR)

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR)
  },
  filename: function (req, file, cb) {
    // cb(null, file.fieldname + '-' + Date.now())
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

router.post('/upload', upload.single('file'), async (req, res, next) => {
  console.log(req.file)
  console.log(req.body)
  if (req.file) {
    const { file } = req
    const avatar = await jimp.read(file.path)
    await avatar
      .autocrop()
      .cover(
        250,
        250,
        jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE
      )
      .writeAsync(file.path)
    await fs.rename(file.path, path.join(AVATARS_DIR, file.originalname))
  }
  res.status(200).json({ message: 'file successufuly upload' })
})

module.exports = {
  uploadRouter: router,
  UPLOAD_DIR,
  AVATARS_DIR
}
