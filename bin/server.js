const MongoClient = require('mongodb').MongoClient

const app = require('../app')

const PORT = process.env.PORT || 3000
const start = async () => {
  const client = await MongoClient.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  const db = client.db('db-contacts')

  const Contacts = db.collection('contacts')
  const contacts = await Contacts.find({}).toArray()
  console.log(contacts)
  app.listen(PORT, (err) => {
    if (err) {
      console.error('Error at server lanch', err)
    }
    console.log(`Server running. Use our API on port: ${PORT}`)
  })
}
start()
