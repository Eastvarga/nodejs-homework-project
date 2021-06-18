const MongoClient = require('mongodb').MongoClient
const collections = {}

const getCollections = () => {
  return collections
}

const connectMongo = async () => {
  const client = await MongoClient.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  const db = client.db('db-contacts')

  collections.Contacts = db.collection('contacts')
}

module.exports = { connectMongo, getCollections }
