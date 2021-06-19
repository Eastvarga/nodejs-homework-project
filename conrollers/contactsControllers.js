// const {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact
// } = require('../model')

const { Contact } = require('../db/contactModel')

module.exports = {
  getContactsList: async (req, res, next) => {
    const contacts = await Contact.find({})
    // const contacts = await listContacts(req)
    res.json({ contacts })
  },
  getContactById: async (req, res, next) => {
    const { contactId } = req.params
    const contact = await Contact.findById(contactId)
    // const contact = await getContactById(contactId)
    if (!contact) {
      return res.status(404).json({ message: 'Not found' })
    }
    res.status(200).json({ contact })
  },
  addContact: async (req, res, next) => {
    const contact = new Contact({ ...req.body })
    await contact.save()
    // const body = req.body
    // await addContact({ ...body })
    res.status(201).json({ message: 'contact added to data base' })
  },
  deleteContactById: async (req, res, next) => {
    const { contactId } = req.params
    await Contact.findByIdAndRemove(contactId)
    // const deleted = await removeContact(contactId)
    // if (!deleted) {
    //   res.status(404).json({ message: 'Not found' })
    //   return
    // }
    res.status(200).json({ message: 'contact deleted' })
  },
  updateContactById: async (req, res, next) => {
    const { contactId } = req.params
    const body = req.body
    await Contact.findByIdAndUpdate(contactId, { $set: { ...body } })
    // console.log('Enter to updateContact')
    // const updatedContact = await updateContact(contactId, req.body)
    // if (!updatedContact) {
    //   return res.status(404).json({ message: 'Not found' })
    // }
    res.status(200).json({
      message: `Contact with id: ${contactId} update success`
    })
  }
}
