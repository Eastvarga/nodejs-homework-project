const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  updateStatusContact
} = require('../model')

module.exports = {
  getContactsListController: async (req, res, next) => {
    const contacts = await listContacts()
    res.json({ contacts })
  },
  getContactByIdController: async (req, res, next) => {
    const { contactId } = req.params
    const contact = await getContactById(contactId)
    res.status(200).json({ contact })
  },
  addContactController: async (req, res, next) => {
    const body = req.body
    await addContact(body)
    res.status(201).json({ message: 'contact added to data base' })
  },
  deleteContactByIdController: async (req, res, next) => {
    const { contactId } = req.params
    await removeContact(contactId)
    res.status(200).json({ message: 'contact deleted' })
  },
  updateContactByIdController: async (req, res, next) => {
    const { contactId } = req.params
    const body = req.body
    await updateContact({ contactId, body })
    res.status(200).json({
      message: `Contact with id: ${contactId} updated`
    })
  },
  updateStatusContactController: async (req, res, next) => {
    const { contactId } = req.params

    const body = req.body
    const contact = await updateStatusContact({ contactId, body })
    res.status(200).json({ contact })
  }
}
