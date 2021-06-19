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
  }
}
