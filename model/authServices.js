const { v4: uuid4 } = require('uuid')
const sendEmail = require('../helpers/sendEmail')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { User } = require('../db/userModel')

const {
  EmptyParametersError,
  RegistrationConflictError,
  NotAuthanticateError,
  VerificationUserNotFoundError,
  NotAuthorisedError,
} = require('../helpers/errors')
const select = 'email subscription -_id'
const selectAvatar = 'avatarURL -_id'
const { avatarRenameAndSave, avatarDelete } = require('../helpers/avatarSaver')
// const cloudinary = require('cloudinary').v2
// cloudinary.config({
//   cloud_name: 'sample',
//   api_key: '874837483274837',
//   api_secret: 'a676b67565c6767a6767d6767f676fe1',
//   secure: true
// })

const registration = async ({ email, password }) => {
  const verifyToken = uuid4()
  // send email
  try {
    await sendEmail({ verifyToken, email })
  } catch (err) {
    throw new VerificationUserNotFoundError('registration not complite')
  }
  const existEmail = await User.findOne({ email })
  if (existEmail) {
    throw new RegistrationConflictError('Email in use')
  }
  const user = new User({
    email,
    password,
    verifyToken,
  })
  const newUser = await user.save()
  return {
    email: newUser.email,
    subscription: newUser.subscription,
    avatarURL: newUser.avatarURL
  }
}

const login = async ({ email, password }) => {
  const user = await User.findOne({ email })
  if (!user || !(await bcrypt.compare(password, user.password)) || !user.verify) {
    throw new NotAuthanticateError('Email or password is wrong')
  }
  // if (!(await bcrypt.compare(password, user.password))) {
  //   throw new NotAuthanticateError('Email or password is wrong')
  // }
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      subscription: user.subscription
    },
    process.env.JWT_SECRET
  )
  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { $set: { token } },
    { new: true }
  )
  return updatedUser
}

const logout = async ({ id, token }) => {
  const updatedUser = await User.findOneAndUpdate(
    { _id: id, token },
    { $set: { token: null } },
    { new: true }
  )
  if (!updatedUser) {
    throw new NotAuthanticateError('Not authorized')
  }
}

const getCurrentUser = async ({ id, token }) => {
  const currentUser = await User.findOne({ _id: id, token }, select)
  if (!currentUser) {
    throw new NotAuthanticateError('Not authorized')
  }
  return currentUser
}

const updateCurrentUserSubscription = async ({ id, token, body }) => {
  const { subscription } = body
  if (!subscription) {
    throw new EmptyParametersError('subscription not defined')
  }
  const updatedSubscriptionCurrentUser = await User.findOneAndUpdate(
    { _id: id, token },
    { $set: { subscription } },
    {
      new: true,
      projection: select
    }
  )
  if (!updatedSubscriptionCurrentUser) {
    throw new NotAuthanticateError('Not authorized')
  }
  return updatedSubscriptionCurrentUser
}
const updateAvatar = async ({ id, token, pathAvatar }) => {
  const oldAvatarURL = await User.findOne({ _id: id, token }, selectAvatar)
  if (oldAvatarURL.avatarURL) {
    await avatarDelete(oldAvatarURL.avatarURL)
  }

  const avatarURL = await avatarRenameAndSave(pathAvatar)
  const updatedCurrentUserAvatar = await User.findOneAndUpdate(
    { _id: id, token },
    { $set: { avatarURL } },
    {
      new: true,
      projection: selectAvatar
    }
  )
  if (!updatedCurrentUserAvatar) {
    throw new NotAuthanticateError('Not authorized')
  }
  return updatedCurrentUserAvatar
}
const verifyUser = async (verifyToken) => {
  const user = await User.findOne({ verifyToken })
  if (user) {
    await user.updateOne({ verify: true, verifyToken: null })
    return
  }
  throw new VerificationUserNotFoundError('User not found')
}

const repeateSendingMail = async ({ email }) => {
  const user = await User.findOne({ email })
  if (user && !user.verify) {
    try {
      await sendEmail({ verifyToken: user.verifyToken, email })
      return
    } catch (err) {
      throw new VerificationUserNotFoundError('registration not complite')
    }
  }
  if (user && user.verify) {
    throw new NotAuthorisedError('Verification has already been passed')
  }
  if (!user) { throw new NotAuthorisedError('User not found') }
}
module.exports = {
  registration,
  login,
  logout,
  getCurrentUser,
  updateCurrentUserSubscription,
  updateAvatar,
  verifyUser,
  repeateSendingMail,
}
