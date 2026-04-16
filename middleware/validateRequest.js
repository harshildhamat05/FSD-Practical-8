import { validationResult } from 'express-validator'

const validateRequest = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors.array().map(({ type, value, msg, path, location }) => ({
        type,
        value,
        message: msg,
        field: path,
        location,
      })),
    })
  }

  return next()
}

export default validateRequest