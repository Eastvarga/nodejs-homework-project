const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
async function hashingPassword() {
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, 10)
  }
}

const userShema = new mongoose.Schema({
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter'
  },
  token: {
    type: String,
    default: null
  }
})

userShema.pre('save', hashingPassword)

const User = mongoose.model('user', userShema)

module.exports = {
  User
}
