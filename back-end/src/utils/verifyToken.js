const jwt = require("jsonwebtoken");

let verifyToken = (token) => {
  try {
    const isValid = jwt.verify(token, process.env.JWT_SECRET);
    return isValid;
  } catch (error) {
    return error.message;
  }
}

module.exports = {
  verifyToken
}