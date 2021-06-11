const path = require('path')
const fs = require('fs/promises')
const contacts = require('./contacts.json')
const contactsPath = path.resolve('./model/contacts.json')

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, 'utf8')
    const contacts = JSON.parse(data)
    // console.table(contacts)
    return contacts
  } catch (error) {
    console.error(error)
  }
}

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, 'utf8')
    const contacts = JSON.parse(data)
    const contact = contacts.find((elem) => elem.id === contactId)
    // console.table(contact)
    if (!contact){ throw new Error}
    return contact
  } catch (error) {
    console.error(error)
  }
}

const removeContact = async (contactId) => {}

const addContact = async (body) => {
  try {
    const { name, email, phone } = body
    const date = new Date()
    const id = date.getTime().toString()
    const data = await fs.readFile(contactsPath, 'utf8')
    const contacts = JSON.parse(data)
    if (contacts.)
    contacts.push({ id, name, email, phone })
    const stringifyContacts = JSON.stringify(contacts)
    await fs.writeFile(contactsPath, stringifyContacts)
  } catch (error) {
    console.error(error)
  }
}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
}
