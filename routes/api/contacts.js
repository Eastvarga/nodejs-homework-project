const express = require('express')
const router = express.Router()
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
} = require('../../model/index')
const Joi = require('joi')

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts()
    res.status(200).json({ contacts })
  } catch (error) {
    console.error(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contact = await getContactById(contactId)
    if (!contact) {
      res.status(404).json({ message: 'Not found' })
      return
    }
    res.status(200).json({ contact })
  } catch (error) {
    console.error(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2
        })
        .required(),
      phone: Joi.string()
        .pattern(/^[(][0-9]{3}[)] [0-9]{3}-[0-9]{4}$/)
        .required()
    })

    const validationResult = schema.validate(req.body)
    if (validationResult.error) {
      const keyError = validationResult.error.details[0].context.key
      return res.status(400).json({
        message: `missing required ${keyError} field`
      })
    }
    const { name, email, phone } = req.body
    const contact = await addContact({ name, email, phone })
    res.status(201).json({ contact })
  } catch (error) {
    console.error(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const deleted = await removeContact(contactId)
    if (!deleted) {
      res.status(404).json({ message: 'Not found' })
      return
    }
    res.status(200).json({ message: 'contact deleted' })
  } catch (error) {
    console.error(error)
  }
})

router.patch('/:contactId', async (req, res, next) => {
  try {
    const body = req.body
    const schema = Joi.object({
      name: Joi.string().min(3).max(30),
      email: Joi.string().email({
        minDomainSegments: 2
      }),
      phone: Joi.string().pattern(/^[(][0-9]{3}[)] [0-9]{3}-[0-9]{4}$/)
    })
    if (Object.keys(body).length === 0) {
      return res.status(400).json({ message: 'missing fields' })
    }
    const validationResult = schema.validate(body)
    if (validationResult.error) {
      const keyError = validationResult.error.details[0].context.key
      return res.status(400).json({
        message: `wrong ${keyError} field`
      })
    }
    const { contactId } = req.params
    const { name, email, phone } = body
    const updatedContact = await updateContact(contactId, {
      name,
      email,
      phone
    })
    if (!updatedContact) {
      return res.status(404).json({ message: 'Not found' })
    }
    res.status(200).json({ body: body, contact: updatedContact })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
