class noteBookError extends Error {
  constructor(message) {
    super(message)
    this.status = 400
  }
}
class ValidationError extends noteBookError {
  constructor(message) {
    super(message)
    this.status = 400
  }
}

class EmptyParametersError extends noteBookError {
  constructor(message) {
    super(message)
    this.status = 400
  }
}
class NotAuthorisedError extends noteBookError {
  constructor(message) {
    super(message)
    this.status = 400
  }
}
class NotAuthanticateError extends noteBookError {
  constructor(message) {
    super(message)
    this.status = 401
  }
}
class RegistrationConflictError extends noteBookError {
  constructor(message) {
    super(message)
    this.status = 409
  }
}

module.exports = {
  noteBookError,
  ValidationError,
  EmptyParametersError,
  NotAuthorisedError,
  RegistrationConflictError,
  NotAuthanticateError
}
