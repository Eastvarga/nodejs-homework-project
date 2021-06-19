const MongoClient = require('mongodb').MongoClient
const collections = {}

const getCollections = () => {
  return collections
}

const connectMongo = async () => {
  try {
    const client = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    const db = client.db('db-contacts')

    collections.Contacts = db.collection('contacts')
    console.log('Database connection successful')
  } catch (err) {
    console.error(
      `Failed to connect to data  base with error: "${err.message}"`
    )
  }
}

module.exports = { connectMongo, getCollections }
