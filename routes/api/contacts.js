const express = require('express')
const router = express.Router()
const {
  getContactsListController,
  getContactByIdController,
  addContactController,
  deleteContactByIdController,
  updateContactByIdController
} = require('../../conrollers/contactsControllers')
const {
  addContactValidation,
  changeContactValidation
} = require('../../middlewares/validationMiddlewares')
const { asyncWrapper } = require('../../helpers/apiHelpers')

router.get('/', asyncWrapper(getContactsListController))

router.get('/:contactId', asyncWrapper(getContactByIdController))

router.post('/', addContactValidation, asyncWrapper(addContactController))

router.delete('/:contactId', asyncWrapper(deleteContactByIdController))

router.put(
  '/:contactId',
  changeContactValidation,
  asyncWrapper(updateContactByIdController)
)

module.exports = router
