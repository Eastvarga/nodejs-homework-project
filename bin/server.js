const app = require('../app')
const { connectMongo } = require('../db/connection')

const fs = require('fs').promises
const { UPLOAD_DIR, AVATARS_DIR } = require('../routes/api/upload')

const isAccessible = (path) => {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false)
}

const createFolderIsNotExist = async (folder) => {
  if (!(await isAccessible(folder))) {
    await fs.mkdir(folder)
  }
}

const PORT = process.env.PORT || 3000
const start = async () => {
  try {
    await connectMongo()
    app.listen(PORT, async (err) => {
      await createFolderIsNotExist(UPLOAD_DIR)
      await createFolderIsNotExist(AVATARS_DIR)
      if (err) {
        console.error('Error at server lanch', err)
      }
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  } catch (err) {
    console.error(`Faied to launch application with error ${err.message}`)
  }
}
start()
