const bcrypt = require("bcrypt");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

let hashString = (data) => {
  // hash the password
  return bcrypt.hashSync(data, salt);
}

let compareHash = (passwordRef, userPassword) => {
  return bcrypt.compareSync(passwordRef, userPassword);
}

module.exports = {
  hashString,
  compareHash
}