const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")
dotenv.config();

let generateToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '1d'
  })
  return token;
}

let verifyToken = (token) => {
  try {
    const isValid = jwt.verify(token, process.env.JWT_SECRET);
    return isValid;
  } catch (error) {
    return error.message;
  }
}

module.exports = { generateToken, verifyToken }