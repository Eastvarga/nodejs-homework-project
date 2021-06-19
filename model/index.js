const { getCollections } = require('../db/connection')
const ObjectId = require('mongodb').ObjectId

const listContacts = async () => {
  try {
    const { Contacts } = await getCollections()
    const contacts = await Contacts.find({}).toArray()
    return contacts
  } catch (error) {
    console.error(error)
  }
}

const getContactById = async (contactId) => {
  try {
    const { Contacts } = await getCollections()
    const contact = await Contacts.findOne({
      _id: new ObjectId(contactId)
    })

    if (!contact) {
      return false
    }
    return contact
  } catch (error) {
    console.log(error)
  }
}

const removeContact = async (contactId) => {
  try {
    const { Contacts } = await getCollections()
    await Contacts.deleteOne({
      _id: new ObjectId(contactId)
    })
    return true
  } catch (error) {
    console.error(error)
  }
}

const addContact = async (body) => {
  try {
    const { name, email, phone } = body
    const { Contacts } = await getCollections()
    await Contacts.insertOne({ name, email, phone })
  } catch (error) {
    console.error(error)
  }
}

const updateContact = async (contactId, body) => {
  try {
    // console.log('Inside updateContact')
    // const updatedContactId = Number(contactId)
    // const { name, email, phone } = body
    // const data = await fs.readFile(contactsPath, 'utf8')
    // const contacts = JSON.parse(data)
    // const [updatedContact] = contacts.filter(
    //   ({ id }) => id === updatedContactId
    // )
    // if (!updatedContact) {
    //   return false
    // }
    const { Contacts } = await getCollections()
    await Contacts.updateOne(
      {
        _id: new ObjectId(contactId)
      },
      { $set: { ...body } }
    )
    // console.log('contact', contact)
    // if (!contact.acknowledged) {
    //   return false
    // }

    // contacts.forEach((contact) => {
    //   if (contact.id === updatedContactId) {
    //     if (name) {
    //       contact.name = name
    //     }
    //     if (email) {
    //       contact.email = email
    //     }
    //     if (phone) {
    //       contact.phone = phone
    //     }
    //   }
    // })
    // const stringifyContacts = JSON.stringify(contacts)
    // await fs.writeFile(contactsPath, stringifyContacts)
    return true
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
}
