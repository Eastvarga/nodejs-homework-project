const express = require('express')
const router = express.Router()
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
} = require('../../model/index')

router.get('/', async (req, res, next) => {
  const contacts = await listContacts()
  res.status(200)
  res.json({ message: contacts })
})

router.get('/:contactId', async (req, res, next) => {
  const contact = await getContactById(req.params.contactId)
  res.status(200)
  res.json({ message: contact, status: 'success' })
})

router.post('/', async (req, res, next) => {
  addContact(req.body)
  res.json({ message: 'contact added' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
