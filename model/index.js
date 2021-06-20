const { Contact } = require('../db/contactModel')
const { EmptyParametersError } = require('../helpers/errors')

const listContacts = async () => {
  const contacts = await Contact.find({})
  return contacts
}
const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId)
  if (!contact) {
    throw new EmptyParametersError(
      `The contact with id: ${contactId} do not exist`
    )
  }
  return contact
}
const addContact = async (body) => {
  const contact = new Contact({ ...body })
  await contact.save()
}
const updateContact = async ({ contactId, body }) => {
  await Contact.findByIdAndUpdate(contactId, { $set: { ...body } })
}
const removeContact = async (contactId) => {
  await Contact.findByIdAndRemove(contactId)
}
const updateStatusContact = async ({ contactId, body }) => {
  const { favorite } = body
  const contact = await Contact.findByIdAndUpdate(
    contactId,
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
