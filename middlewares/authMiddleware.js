const {
  //   ValidationError,
  //   EmptyParametersError,
  //   NotAuthorisedError,
  //   RegistrationConflictError,
  NotAuthanticateError
} = require('../helpers/errors')
const jwt = require('jsonwebtoken')
const { User } = require('../db/userModel')

const authMiddleware = async (req, res, next) => {
  try {
    const [tokenType, token] = req.headers.authorization.split(' ')
    //   console.log('token', token)
    if (!token) {
      next(new NotAuthanticateError('Not authorized'))
    }

    const user = jwt.verify(token, process.env.JWT_SECRET)
    req.user = user
    req.token = token
    const userExist = await User.findOne({ _id: user.id, token })

    if (!userExist) {
      next(new NotAuthanticateError('Not authorized'))
    }
    next()
  } catch (err) {
    // throw new NotAuthanticateError('Not authorized')
    next(new NotAuthanticateError('Not authorized'))
  }
}
module.exports = {
  authMiddleware
}
