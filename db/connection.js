const mongoose = require('mongoose')

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'db-contacts'
}

const connectMongo = async () => {
  try {
    const mongooseDb = await mongoose.connect(process.env.MONGO_URL, options)
    if (mongooseDb) {
      console.log('Database connection successful')
    }
    return mongooseDb
  } catch (err) {
    console.error(
      `Failed to connect to data  base with error: "${err.message}"`
    )
    process.exit(1)
  }
}

module.exports = { connectMongo }
