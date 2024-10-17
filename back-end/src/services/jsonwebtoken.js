const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

let generateToken = (value) => {
  const token = jwt.sign({ value }, process.env.JWT_SECRET, {
    expiresIn: '1d'
  })
  return token;
}


let verifyToken = (token) => {
  try {
    const isValid = jwt.verify(token, process.env.JWT_SECRET);
    return isValid;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = { generateToken, verifyToken }