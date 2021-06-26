const express = require('express')
const router = express.Router()
const {
  registrationController,
  loginController
} = require('../../conrollers/authControllers')
const { asyncWrapper } = require('../../helpers/apiHelpers')

router.post('/signup', asyncWrapper(registrationController))
// router.get('/current', asyncWrapper())

router.post('/login', asyncWrapper(loginController))
// router.get('/logout', asyncWrapper())

module.exports = { authRouter: router }
