const { Contact } = require('../db/contactModel')
const { EmptyParametersError } = require('../helpers/errors')

const select = '-_id -owner -__v'

const listContacts = async ({ id, query }) => {
  const { limit = 5, page = 1, sortBy, sortByDesc, favorite } = query
  const { docs: contacts, totalDocs: total } = await Contact.paginate(
    {
      owner: id,
      ...(favorite ? { favorite: favorite } : {})
    },
    {
      // select,
      limit,
      page,
      sort: {
        ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
        ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {})
      }
      // populate: {
      //   path: 'owner',
      //   select: 'email subscription -_id'
      // }
    }
  )
  return { contacts, total, page, limit }
}
const getContactById = async ({ id, contactId }) => {
  const contact = await Contact.findOne({ _id: contactId, owner: id }, select)
  if (!contact) {
    throw new EmptyParametersError(
      `The contact with id: ${contactId} do not exist`
    )
  }
  return contact
}
const addContact = async ({ id, body }) => {
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
    {
      new: true,
      projection: select
    }
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
