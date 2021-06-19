const Joi = require('joi')

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
      const keyError = validationResult.error.details[0].context.key
      return res.status(400).json({
        message: `missing required ${keyError} field`
      })
    }
    next()
  },
  patchContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30),
      email: Joi.string().email({
        minDomainSegments: 2
      }),
      phone: Joi.string().pattern(/^[(][0-9]{3}[)] [0-9]{3}-[0-9]{4}$/)
    }).min(1)
    const validationResult = schema.validate(req.body)
    if (validationResult.error) {
      const keyError = validationResult.error.details[0].context.key
      return res.status(400).json({
        message: `wrong ${keyError} field`
      })
    }
    next()
  }
}
