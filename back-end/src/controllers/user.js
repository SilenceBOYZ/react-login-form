const db = require("../models/index");
const { hashPassword, compateHash, compareHash } = require("../utils/hashPassword");
const { generateToken } = require("../utils/generatesToken");
const { v4: uuidv4 } = require('uuid');
const { where } = require("sequelize");
const { sendPasswordResetEmail } = require("../config/nodemailer");

let createUser = async (req, res) => {
  let data = req.body;
  let respone = await new Promise(async (resolve, reject) => {
    try {
      let result = {};
      let checkEmailExist = await db.User.findOne({
        where: {
          email: data.email
        }
      });
      if (checkEmailExist) {
        result.errCode = 1;
        result.message = "The email have been existed"
        resolve(result);
        return;
      };
      let checkUserExist = await db.User.findOne({
        where: {
          username: data.username,
        }
      })
      if (checkUserExist) {
        result.errCode = 1;
        result.message = "The user have been existed";
        resolve(result);
        return;
      };
      // Insert user into table
      const newUser = await db.User.create({
        username: data.username,
        email: data.email,
        password: hashPassword(data.password),
        role_id: 2,
      })
      const userId = parseInt(newUser.dataValues.id);
      let { token_string } = await db.VerifyToken.create({
        token_string: uuidv4(),
        // Set the exp for token (3 hour)
        exp_date: new Date(new Date().getTime() + 3 * 60 * 60 * 1000),
        user_id: userId,
      })

      await sendPasswordResetEmail(newUser.email, token_string);

      result.errCode = 0;
      result.message = "Create user successfully";
      resolve(result);
    } catch (e) {
      reject(e);
    }
  })
  res.status(200).json(respone);
}

let verifyEmail = async (req, res) => {
  let data = req.body;
  let respone = await new Promise(async (resolve, reject) => {
    try {
      let result = {};
      let checkEmailExist = await db.User.findOne({
        where: {
          email: data.email
        }
      });
      if (!checkEmailExist) {
        result.errCode = true;
        result.message = "The email doesn't exist";
        resolve(result);
        return;
      };
      let user_id = parseInt(checkEmailExist.id);
      let getTokenFromUser = await db.VerifyToken.findOne({
        attributes: ["token_String"],
        where: {
          user_id: user_id,
        },
      })
      if (getTokenFromUser.token_String === data.secretKey) {
        await db.User.update({
          is_active: true,
        }, {
          where: {
            id: user_id
          }
        });
        result.errCode = false;
        result.message = "Verify account successfully";
      } else {
        result.errCode = true;
        result.message = "Invalid token string";
      }
      resolve(result);
    } catch (e) {
      reject(e);
    }
  })
  res.status(200).json(respone);
}

let userLogin = async (req, res) => {
  let data = req.body;
  let respone = await new Promise(async (resolve, reject) => {
    try {
      let result = {};
      let user = await db.User.findOne({
        where: {
          username: data.username,
        },
        raw: true,
      },);
      if (!user) {
        result.errCode = 1;
        result.message = "User not found";
        resolve(result);
        return;
      }

      let checkPassword = compareHash(data.password, user.password);
      if (!checkPassword) {
        result.errCode = 2;
        result.message = 'Wrong password';
      }

      if (!user.is_active) {
        result.errCode = 3;
        result.message = "User haven't verify email";
        resolve(result);
        return;
      }
      let accessToken = generateToken(user.username);
      req.session.userLogin = accessToken;
      result.errCode = 0;
      result.role = user.role_id;
      result.message = 'login successfully';
      result.username = accessToken;
      resolve(result);

    } catch (e) {
      reject(e);
    }
  });

  res.status(200).json(respone);
}

let userLogout = async (req, res) => {
  await req.session.destroy();
}

let sendToken = async (req, res) => {
  let data = req.body;
  let respone = await new Promise(async (resolve, reject) => {
    try {
      let result = {};
      let checkEmailExist = await db.User.findOne({
        where: {
          email: data.email
        }
      });
      console.log(checkEmailExist);
      if (!checkEmailExist) {
        result.errCode = true;
        result.message = "The email doesn't exist";
        resolve(result);
        return;
      };
      let user_id = parseInt(checkEmailExist.id);
      let getTokenFromUser = await db.VerifyToken.findOne({
        attributes: ["token_String", "exp_date", "id"],
        where: {
          user_id: user_id,
        },
      })
      let now = new Date();
      let exp_token = new Date(getTokenFromUser.exp_date);
      console.log(now);
      console.log(exp_token);
      if (exp_token > now) {
        // Nếu ngày tạo của token lớn hơn ngày hiện tại
        // Send token đến mail
        sendPasswordResetEmail(data.email, getTokenFromUser.token_string);
      } else {
        // tạo lại token
        let token_string = await db.VerifyToken.update({
          token_string: uuidv4(),
          exp_date: new Date(new Date().getTime() + 3 * 60 * 60 * 1000),
        }, {
          where: {
            id: getTokenFromUser.id,
          }
        })
        sendPasswordResetEmail(data.email, getTokenFromUser.token_string);
      }
      resolve(result);
    } catch (e) {
      reject(e);
    }
  })
  res.status(200).json(respone);
}

module.exports = {
  createUser,
  userLogin,
  verifyEmail,
  userLogout,
  sendToken
}