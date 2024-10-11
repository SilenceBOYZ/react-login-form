const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")
dotenv.config();

let generateToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '1d'
  })
  return token;
}

module.exports = { generateToken }