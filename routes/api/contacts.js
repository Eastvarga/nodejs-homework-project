const express = require('express')
const router = express.Router()
const {
  getContactsList,
  getContactById,
  addContact,
  deleteContactById,
  updateContactById
} = require('../../conrollers/contactsControllers')
const {
  addContactValidation,
  patchContactValidation
} = require('../../middlewares/validationMiddlewares')
const { asyncWrapper } = require('../../helpers/apiHelpers')

router.get('/', asyncWrapper(getContactsList))

router.get('/:contactId', asyncWrapper(getContactById))

router.post('/', addContactValidation, asyncWrapper(addContact))

router.delete('/:contactId', asyncWrapper(deleteContactById))

router.put('/:contactId', patchContactValidation, asyncWrapper(updateContactById))

module.exports = router
