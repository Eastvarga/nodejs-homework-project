const mongoose = require('mongoose')
// const { User } = require('../db/userModel')

const contactShema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact']
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  favorite: {
    type: Boolean,
    default: false
  },
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'user'
  }
})

const Contact = mongoose.model('Contact', contactShema)

module.exports = {
  Contact
}
