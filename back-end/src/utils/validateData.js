const Joi = require('joi');

const email = Joi.string()
  .email()
  .lowercase()
  .min(5)  // Minimum length of 5 characters
  .max(30) // Maximum length of 20 characters
  .required()
  .messages({
    'string.email': 'Please provide a valid email address',
    'string.min': 'Email must be at least 5 characters long',
    'string.max': 'Email cannot be more than 30 characters long',
    'string.empty': 'Email cannot be empty',
    'any.required': 'Email is required'
  });

const password = Joi.string()
  .pattern(new RegExp('^[a-zA-Z0-9@]+$')) // Allow only alphanumeric characters and @
  .pattern(new RegExp('^\\S+$')) // No whitespace allowed
  .pattern(new RegExp('(?=.*[A-Z])')) // At least one uppercase letter
  .pattern(new RegExp('(?=.*[0-9])')) // At least one digit
  .min(8)
  .max(16)
  .required()
  .messages({
    'string.pattern.base': 'Password can only contain letters, numbers, and @ cannot contain whitespace',
    'string.pattern.name': 'Password cannot contain whitespace',
    'string.pattern.name': 'Password must contain at least one uppercase letter',
    'string.pattern.name': 'Password must contain at least one digit',
    'string.pattern.name': 'Password must contain at least one @ symbol',
    'string.min': 'Password must be at least 6 characters long',
    'string.max': 'Password cannot be more than 30 characters long',
    'string.empty': 'Password cannot be empty',
    'any.required': 'Password is required'
  });

const username = Joi.string()
  .alphanum()
  .min(6)
  .max(16)
  .pattern(new RegExp('^[a-zA-Z0-9]+$'))
  .lowercase()
  .required()
  .messages({
    'string.pattern.base': 'Username can only contain letters and numbers (no special characters or whitespace)',
    'string.min': 'Username must be at least 6 characters long',
    'string.max': 'Username cannot be more than 16 characters long',
    'string.empty': 'Username cannot be empty',
    'any.required': 'Username is required'
  });

const confirm_password = Joi.string()
  .valid(Joi.ref('password')) // Must match the password field
  .required()
  .messages({
    'any.only': 'Confirm password must match the password',
    'string.empty': 'Confirm password cannot be empty',
    'any.required': 'Confirm password is required'
  });

const registValidate = Joi.object({
  username: username,
  password: password,
  confirm_password: confirm_password,
  email: email
});

const loginValidate = Joi.object({
  email: email,
  password: password
})


module.exports = {
  registValidate,
  loginValidate
}
