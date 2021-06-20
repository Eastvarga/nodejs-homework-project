const express = require('express')
const router = express.Router()
const {
  getContactsListController,
  getContactByIdController,
  addContactController,
  deleteContactByIdController,
  updateContactByIdController,
  updateStatusContactController
} = require('../../conrollers/contactsControllers')
const {
  addContactValidation,
  changeContactValidation,
  favoriteContactValidation
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
router.patch(
  '/:contactId/favorite',
  favoriteContactValidation,
  asyncWrapper(updateStatusContactController)
)

module.exports = router
