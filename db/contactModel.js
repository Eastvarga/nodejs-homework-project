const mongoose = require('mongoose')

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
  }
})

const Contact = mongoose.model('Contact', contactShema)

module.exports = {
  Contact
}
