const { Contact } = require('../db/contactModel')
const { EmptyParametersError } = require('../helpers/errors')

const listContacts = async (id) => {
  const contacts = await Contact.find({ owner: id })
  return contacts
}
const getContactById = async ({ id, contactId }) => {
  const contact = await Contact.findOne({ _id: contactId, owner: id })
  if (!contact) {
    throw new EmptyParametersError(
      `The contact with id: ${contactId} do not exist`
    )
  }
  return contact
}
const addContact = async ({ id, body }) => {
  // console.log('id', id)
  const contact = new Contact({ ...body, owner: id })
  await contact.save()
}
const updateContact = async ({ id, contactId, body }) => {
  await Contact.findOneAndUpdate(
    { _id: contactId, owner: id },
    { $set: { ...body } }
  )
}
const removeContact = async ({ id, contactId }) => {
  await Contact.findOneAndRemove({ _id: contactId, owner: id })
}
const updateStatusContact = async ({ id, contactId, body }) => {
  const { favorite } = body
  const contact = await Contact.findOneAndUpdate(
    { _id: contactId, owner: id },
    { $set: { favorite } },
    { new: true }
  )
  if (!contact) {
    throw new EmptyParametersError(
      `The contact with id: ${contactId} do not exist`
    )
  }
  return contact
}
module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  updateStatusContact
}
