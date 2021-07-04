const express = require('express')
const router = express.Router()
const {
  registrationController,
  loginController,
  logoutController,
  getCurrentUserController,
  updateCurrentUserSubscriptionController,
  updateCurrentUserAvatarController
} = require('../../conrollers/authControllers')
const { asyncWrapper } = require('../../helpers/apiHelpers')
const {
  authorizationValidation,
  subscriptionValidation
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
router.get('/current', authMiddleware, asyncWrapper(getCurrentUserController))
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
