const {
  //   ValidationError,
  //   EmptyParametersError,
  //   NotAuthorisedError,
  //   RegistrationConflictError,
  NotAuthanticateError
} = require('../helpers/errors')
const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
  const [tokenType, token] = req.headers.authorization.split(' ')
  //   console.log('token', token)
  if (!token) {
    next(new NotAuthanticateError('Not authorized'))
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET)
    req.user = user
    req.token = token
    next()
  } catch (err) {
    throw new NotAuthanticateError('Not authorized')
  }
}
module.exports = {
  authMiddleware
}
