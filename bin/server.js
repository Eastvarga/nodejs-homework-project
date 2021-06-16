const MongoClient = require('mongodb').MongoClient

const app = require('../app')

const PORT = process.env.PORT || 3000
console.log('process.env.MONGO_URL', process.env.MONGO_URL)
const start = async () => {
  try {
    const client = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true
    })
    const db = client.db()

    const Contacts = db.collection('contacts')
    const contacts = await Contacts.find({})
    console.log(contacts)
    app.listen(PORT, (err) => {
      if (err) {
        console.error('Error at server lanch', err)
      }
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  } catch (err) {
    console.error('Error at try catch loop', err)
  }
}
start()
