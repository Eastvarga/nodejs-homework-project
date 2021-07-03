const fs = require('fs').promises
const jimp = require('jimp')
const path = require('path')
const { AVATARS_DIR } = require('../helpers/uploads')
const { v4: uuidv4 } = require('uuid')

const avatarRenameAndSave = async (pathAvatar) => {
  if (pathAvatar) {
    const avatar = await jimp.read(pathAvatar)
    await avatar
      .autocrop()
      .cover(
        250,
        250,
        jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE
      )
      .writeAsync(pathAvatar)
    const newPathWithExt = []
    newPathWithExt.push(uuidv4())
    newPathWithExt.push(pathAvatar.split('.')[1])
    const avatarURL = '/avatars/' + newPathWithExt.join('.')
    const avatarPath = path.join(AVATARS_DIR, newPathWithExt.join('.'))
    await fs.rename(pathAvatar, avatarPath)
    return avatarURL
  }
}

module.exports = {
  avatarRenameAndSave
}
