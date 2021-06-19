const { Contact } = require('../db/contactModel')
const { EmptyParametersError } = require('../helpers/errors')

const getContacts = async () => {
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
const changeContactById = async ({ contactId, body }) => {
  await Contact.findByIdAndUpdate(contactId, { $set: { ...body } })
}
const deleteContactById = async (contactId) => {
  await Contact.findByIdAndRemove(contactId)
}
module.exports = {
  getContacts,
  getContactById,
  addContact,
  changeContactById,
  deleteContactById
}
