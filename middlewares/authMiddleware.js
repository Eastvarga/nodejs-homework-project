const { NotAuthanticateError } = require('../helpers/errors')
const jwt = require('jsonwebtoken')
const { User } = require('../db/userModel')

const authMiddleware = async (req, res, next) => {
  try {
    const [, token] = req.headers.authorization.split(' ')

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
    next(new NotAuthanticateError('Not authorized'))
  }
}
module.exports = {
  authMiddleware
}
