const MongoClient = require('mongodb').MongoClient
const connectMongo = async () => {
  const client = await MongoClient.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  const db = client.db('db-contacts')

  const Contacts = db.collection('contacts')
  return { Contacts }
}

module.exports = { connectMongo }
