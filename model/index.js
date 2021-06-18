const { connectMongo, getCollections } = require('../db/connection')
const ObjectId = require('mongodb').ObjectId
const path = require('path')
const fs = require('fs/promises')
const { ObjectID } = require('mongodb')
const contactsPath = path.resolve('./model/contacts.json')

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
    const data = await fs.readFile(contactsPath, 'utf8')
    const contacts = JSON.parse(data)
    const deletedContactIndex = contacts.findIndex(
      ({ id }) => id === Number(contactId)
    )
    if (deletedContactIndex === -1) {
      return false
    }
    contacts.splice(deletedContactIndex, 1)
    const stringifyContacts = JSON.stringify(contacts)
    await fs.writeFile(contactsPath, stringifyContacts)
    return true
  } catch (error) {
    console.error(error)
  }
}

const addContact = async (body) => {
  try {
    const { name, email, phone } = body
    const date = new Date()
    const id = date.getTime()
    const data = await fs.readFile(contactsPath, 'utf8')
    const contacts = JSON.parse(data)
    const contact = { id, name, email, phone }
    contacts.push(contact)
    const stringifyContacts = JSON.stringify(contacts)
    await fs.writeFile(contactsPath, stringifyContacts)
    return contact
  } catch (error) {
    console.error(error)
  }
}

const updateContact = async (contactId, body) => {
  try {
    const updatedContactId = Number(contactId)
    const { name, email, phone } = body
    const data = await fs.readFile(contactsPath, 'utf8')
    const contacts = JSON.parse(data)
    const [updatedContact] = contacts.filter(
      ({ id }) => id === updatedContactId
    )
    if (!updatedContact) {
      return false
    }
    contacts.forEach((contact) => {
      if (contact.id === updatedContactId) {
        if (name) {
          contact.name = name
        }
        if (email) {
          contact.email = email
        }
        if (phone) {
          contact.phone = phone
        }
      }
    })
    const stringifyContacts = JSON.stringify(contacts)
    await fs.writeFile(contactsPath, stringifyContacts)
    return updatedContact
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
