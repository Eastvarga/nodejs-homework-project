const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { User } = require('../db/userModel')

const {
  //   NotAuthorisedError,
  NotAuthanticateError
} = require('../helpers/errors')

const registration = async ({ email, password }) => {
  const user = new User({
    email,
    password
  })
  const newUser = await user.save()
  return { email: newUser.email, subscription: newUser.subscription }
}
const login = async ({ email, password }) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new NotAuthanticateError('Email or password is wrong')
  }
  if (!(await bcrypt.compare(password, user.password))) {
    throw new NotAuthanticateError('Email or password is wrong')
  }
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      subscription: user.subscription
    },
    process.env.JWT_SECRET
  )
  await User.findByIdAndUpdate(user._id, { $set: { token } })
  return token
}
const logout = async (id) => {}

module.exports = {
  registration,
  login,
  logout
}
