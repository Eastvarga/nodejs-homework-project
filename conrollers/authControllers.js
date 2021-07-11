const {
  registration,
  login,
  logout,
  getCurrentUser,
  updateCurrentUserSubscription,
  updateAvatar,
  verifyUser,
  repeateSendingMail,
} = require('../model/authServices')

const registrationController = async (req, res) => {
  const { email, password } = req.body
  const user = await registration({ email, password })
  res.status(201).json({ user })
}
const loginController = async (req, res) => {
  const { email, password } = req.body
  const user = await login({
    email,
    password
  })
  res.status(200).json({
    token: user.token,
    user: {
      email: user.email,
      subscription: user.subscription,
      avatarURL: user.avatarURL
    }
  })
}
const logoutController = async (req, res) => {
  const { id } = req.user
  const token = req.token
  await logout({
    id,
    token
  })

  res.status(204).json({})
}
const getCurrentUserController = async (req, res) => {
  const { id } = req.user
  const token = req.token
  const currentUser = await getCurrentUser({
    id,
    token
  })

  res.json({ user: currentUser })
}
const updateCurrentUserSubscriptionController = async (req, res) => {
  const { id } = req.user
  const token = req.token
  const body = req.body
  const updatedUser = await updateCurrentUserSubscription({
    id,
    token,
    body
  })

  res.json({ user: updatedUser })
}

const updateCurrentUserAvatarController = async (req, res) => {
  const { id } = req.user
  const token = req.token
  const pathAvatar = req.file.path
  const { avatarURL } = await updateAvatar({ id, token, pathAvatar })
  res.status(200).json({
    avatarURL
  })
}
const veryfyRegistrationController = async (req, res) => {
  const { verificationToken } = req.params
  await verifyUser(verificationToken)
  res.status(200).json({
    message: 'Verification successful',
  })
}
const repeatedVeryfyRegistrationController = async (req, res) => {
  const { email } = req.body
  await repeateSendingMail({ email })

  res.status(200).json({
    message: 'Verification email sent',
  })
}

module.exports = {
  registrationController,
  loginController,
  logoutController,
  getCurrentUserController,
  updateCurrentUserSubscriptionController,
  updateCurrentUserAvatarController,
  veryfyRegistrationController,
  repeatedVeryfyRegistrationController,
}
