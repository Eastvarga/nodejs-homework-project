const rateLimit = require('express-rate-limit')
const { accountRateLimit } = require('../config/rate-limit.json')

const createAccountLimiter = rateLimit({
  windowMs: accountRateLimit.windowMs,
  max: accountRateLimit.max,
  handler: (req, res, next) => {
    res.status(400).json({
      message:
        'You have reached the  limit of requests for create accounts. Try later'
    })
  }
})

module.exports = { createAccountLimiter }
