const express = require('express')
const router = express.Router()
const {
  registrationController,
  loginController,
  logoutController,
  getCurrentUserController,
  updateCurrentUserSubscriptionController
} = require('../../conrollers/authControllers')
const { asyncWrapper } = require('../../helpers/apiHelpers')
const {
  authorizationValidation,
  subscriptionValidation
} = require('../../middlewares/validationMiddlewares')
const { createAccountLimiter } = require('../../helpers/rate-limit')
const { authMiddleware } = require('../../middlewares/authMiddleware')

router.post(
  '/signup',
  createAccountLimiter,
  authorizationValidation,
  asyncWrapper(registrationController)
)
router.post('/login', authorizationValidation, asyncWrapper(loginController))
router.post('/logout', authMiddleware, asyncWrapper(logoutController))
router.get('/current', authMiddleware, asyncWrapper(getCurrentUserController))
router.patch(
  '/',
  authMiddleware,
  subscriptionValidation,
  asyncWrapper(updateCurrentUserSubscriptionController)
)
module.exports = { authRouter: router }
