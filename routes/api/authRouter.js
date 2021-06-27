const express = require('express')
const router = express.Router()
const {
  registrationController,
  loginController,
  logoutController,
  getCurrentUserController
} = require('../../conrollers/authControllers')
const { asyncWrapper } = require('../../helpers/apiHelpers')
const {
  authorizationValidation
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

module.exports = { authRouter: router }
