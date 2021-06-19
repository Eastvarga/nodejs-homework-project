const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
} = require('../model')

// const Joi = require('joi')

module.exports = {
  getContactsList: async (req, res, next) => {
    // console.log(req.db)
    const contacts = await listContacts(req)
    res.status(200).json({ contacts })
  },
  getContactById: async (req, res, next) => {
    const { contactId } = req.params
    const contact = await getContactById(contactId)
    if (!contact) {
      res.status(404).json({ message: 'Not found' })
      return
    }
    res.status(200).json({ contact })
  },
  addContact: async (req, res, next) => {
    //   const schema = Joi.object({
    //     name: Joi.string().min(3).max(30).required(),
    //     email: Joi.string()
    //       .email({
    //         minDomainSegments: 2
    //       })
    //       .required(),
    //     phone: Joi.string()
    //       .pattern(/^[(][0-9]{3}[)] [0-9]{3}-[0-9]{4}$/)
    //       .required()
    //   })

    //   const validationResult = schema.validate(req.body)
    //   if (validationResult.error) {
    //     const keyError = validationResult.error.details[0].context.key
    //     return res.status(400).json({
    //       message: `missing required ${keyError} field`
    //     })
    //   }
    const body = req.body
    await addContact({ ...body })
    res.status(201).json('contact added to data base')
  },
  deleteContactById: async (req, res, next) => {
    const { contactId } = req.params
    const deleted = await removeContact(contactId)
    if (!deleted) {
      res.status(404).json({ message: 'Not found' })
      return
    }
    res.status(200).json({ message: 'contact deleted' })
  },
  updateContactById: async (req, res, next) => {
    // const body = req.body
    // const schema = Joi.object({
    //   name: Joi.string().min(3).max(30),
    //   email: Joi.string().email({
    //     minDomainSegments: 2
    //   }),
    //   phone: Joi.string().pattern(/^[(][0-9]{3}[)] [0-9]{3}-[0-9]{4}$/)
    // }).min(1)
    // if (Object.keys(body).length === 0) {
    //   return res.status(400).json({ message: 'missing fields' })
    // }
    // const validationResult = schema.validate(body)
    // if (validationResult.error) {
    //   const keyError = validationResult.error.details[0].context.key
    //   return res.status(400).json({
    //     message: `wrong ${keyError} field`
    //   })
    // }
    const { contactId } = req.params
    console.log('Enter to updateContact')
    const updatedContact = await updateContact(contactId, req.body)
    if (!updatedContact) {
      return res.status(404).json({ message: 'Not found' })
    }
    res.status(200).json({ contact: updatedContact })
  }
}
