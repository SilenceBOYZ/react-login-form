const { verifyToken } = require("../services/jsonwebtoken");

let checkUserAccess = async (req, res, next) => {
  try {
    let token = req?.session?.userLogin;
    if (!token) {
      res.status(400).json({
        errCode: 404,
        message: "Login to our system",
      })
      return;
    } 
    let isValidToken = verifyToken(token);
    if(typeof isValidToken == 'object') {
      next();
    } else {
      res.status(400).json(isValidToken);
    }
  } catch (error) {
    console.log(error.message);
  }
}


module.exports = {
  checkUserAccess
}