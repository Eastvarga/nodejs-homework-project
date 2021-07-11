const express = require('express')
const router = express.Router()
const {
  registrationController,
  loginController,
  logoutController,
  getCurrentUserController,
  updateCurrentUserSubscriptionController,
  updateCurrentUserAvatarController,
  veryfyRegistrationController,
  repeatedVeryfyRegistrationController,
} = require('../../conrollers/authControllers')
const { asyncWrapper } = require('../../helpers/apiHelpers')
const {
  authorizationValidation,
  subscriptionValidation,
  repeatedVerifyValidation,
} = require('../../middlewares/validationMiddlewares')
const { createAccountLimiter } = require('../../helpers/rate-limit')
const { authMiddleware } = require('../../middlewares/authMiddleware')
const { upload } = require('../../helpers/uploads')

router.post(
  '/signup',
  createAccountLimiter,
  authorizationValidation,
  asyncWrapper(registrationController)
)

router.post('/login', authorizationValidation, asyncWrapper(loginController))

router.post('/logout', authMiddleware, asyncWrapper(logoutController))

router.post('/verify/', repeatedVerifyValidation,
  asyncWrapper(repeatedVeryfyRegistrationController))

router.get('/current', authMiddleware, asyncWrapper(getCurrentUserController))

router.get('/verify/:verificationToken',
  asyncWrapper(veryfyRegistrationController))

router.patch(
  '/avatars',
  authMiddleware,
  upload.single('avatar'),
  asyncWrapper(updateCurrentUserAvatarController)
)

router.patch(
  '/',
  authMiddleware,
  subscriptionValidation,
  asyncWrapper(updateCurrentUserSubscriptionController)
)

module.exports = { authRouter: router }
