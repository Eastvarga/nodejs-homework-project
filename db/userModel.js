const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const gravatar = require('gravatar')
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
  },
  avatarURL: {
    type: String,
    default: function () {
      return gravatar.url(this.email, { s: '250' }, true)
    }
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verifyToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
})

userShema.pre('save', hashingPassword)

const User = mongoose.model('user', userShema)

module.exports = {
  User
}
