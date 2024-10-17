const Joi = require('joi');

const email = Joi.string()
  .email()
  .lowercase()
  .min(5)  // Minimum length of 5 characters
  .max(50) // Maximum length of 50 characters
  .required()
  .messages({
    'string.email': 'Please provide a valid email address',
    'string.min': 'Invalid character length',
    'string.max': 'Invalid character length',
    'string.empty': 'Email cannot be empty',
    'any.required': 'Email is required'
  });

const password = Joi.string()
  .pattern(new RegExp('^[a-zA-Z0-9@]+$')) // Allow only alphanumeric characters and @
  .pattern(new RegExp('^\\S+$')) // No whitespace allowed
  .pattern(new RegExp('(?=.*[A-Z])')) // At least one uppercase letter
  .pattern(new RegExp('(?=.*[0-9])')) // At least one digit
  .min(5)
  .max(40)
  .required()
  .messages({
    'string.pattern.base': 'Password can only contain letters, uppercase, numbers, and @ cannot contain whitespace',
    'string.min': 'Invalid character length',
    'string.max': 'Invalid character length',
    'string.empty': 'Password cannot be empty',
    'any.required': 'Password is required'
  });

const username = Joi.string()
  .alphanum()
  .min(4)
  .max(30)
  .pattern(new RegExp('^[a-zA-Z0-9]+$'))
  .lowercase()
  .required()
  .messages({
    'string.pattern.base': 'Username can only contain letters and numbers (no special characters or whitespace)',
    'string.min': 'Invalid character length',
    'string.max': 'Invalid character length',
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
  loginValidate,
  emailValidate: email 
}
