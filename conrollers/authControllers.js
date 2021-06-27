const {
  registration,
  login,
  logout,
  getCurrentUser
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
    user: { email: user.email, subscription: user.subscription }
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

  res.json({ ...currentUser })
}
module.exports = {
  registrationController,
  loginController,
  logoutController,
  getCurrentUserController
}
