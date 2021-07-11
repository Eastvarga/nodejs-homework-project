const express = require('express')
const logger = require('morgan')

const path = require('path')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const { apiLimit, jsonLimit } = require('./config/rate-limit.json')
require('dotenv').config()
const { authRouter } = require('./routes/api/authRouter')
const contactsRouter = require('./routes/api/contacts')
const { errorHandler } = require('./helpers/apiHelpers')
const { ValidationError } = require('./helpers/errors')
const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(helmet())
app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json({ limit: jsonLimit }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(
  '/api/',
  rateLimit({
    windowMs: apiLimit.windowMs,
    max: apiLimit.max,
    handler: (req, res, next) => {
      next(
        new ValidationError('You have reached the 15 minutes limit of requests')
      )
    }
  })
)
app.use('/api/contacts/users', authRouter)
app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use(errorHandler)

module.exports = app
