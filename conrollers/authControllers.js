const { registration, login } = require('../model/authServices')

const registrationController = async (req, res) => {
  const { email, password } = req.body
  const user = await registration({ email, password })
  res.status(201).json({ user })
}
const loginController = async (req, res) => {
  const { email, password } = req.body
  const token = await login({ email, password })
  res.status(200).json({ token })
}
module.exports = { registrationController, loginController }
