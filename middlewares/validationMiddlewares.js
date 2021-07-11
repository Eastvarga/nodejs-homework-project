const Joi = require('joi')
const { ValidationError } = require('../helpers/errors')

module.exports = {
  addContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2
        })
        .required(),
      phone: Joi.string()
        .pattern(/^[(][0-9]{3}[)] [0-9]{3}-[0-9]{4}$/)
        .required()
    })
    const validationResult = schema.validate(req.body)
    if (validationResult.error) {
      next(new ValidationError(validationResult.error.message))
    }
    next()
  },
  changeContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30),
      email: Joi.string().email({
        minDomainSegments: 2
      }),
      phone: Joi.string().pattern(/^[(][0-9]{3}[)] [0-9]{3}-[0-9]{4}$/)
    }).min(1)
    const validationResult = schema.validate(req.body)
    if (validationResult.error) {
      next(new ValidationError(validationResult.error.message))
    }
    next()
  },
  favoriteContactValidation: (req, res, next) => {
    const schema = Joi.object({
      favorite: Joi.boolean().required()
    })
    const validationResult = schema.validate(req.body)
    if (validationResult.error) {
      next(new ValidationError('missing field favorite'))
    }
    next()
  },
  authorizationValidation: (req, res, next) => {
    const schema = Joi.object({
      password: Joi.string().min(3).max(30).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2
        })
        .required()
    })
    const validationResult = schema.validate(req.body)
    if (validationResult.error) {
      next(new ValidationError(validationResult.error.message))
    }
    next()
  },
  subscriptionValidation: (req, res, next) => {
    const schema = Joi.object({
      subscription: Joi.string().valid('starter', 'pro', 'business').required()
    })
    const validationResult = schema.validate(req.body)
    if (validationResult.error) {
      next(new ValidationError(validationResult.error.message))
    }
    next()
  },
  repeatedVerifyValidation: (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string()
        .email({
          minDomainSegments: 2
        })
        .required()
    })
    const validationResult = schema.validate(req.body)
    if (validationResult.error) {
      if (validationResult.error.message === '"email" is required') {
        next(new ValidationError('missing required field email'))
      }
      next(new ValidationError(validationResult.error.message))
    }
    next()
  }
}
