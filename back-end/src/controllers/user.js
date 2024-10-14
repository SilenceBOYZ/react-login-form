const db = require("../models/index");
const { QueryTypes } = require('sequelize');
const { hashPassword, compareHash } = require("../utils/hashPassword");
const { generateToken } = require("../utils/generatesToken");
const { v4: uuidv4 } = require('uuid');
const { sendPasswordResetEmail } = require("../config/nodemailer");

let createUser = async (req, res) => {
  let data = req.body;
  if(!Object.keys(data).length) {
    res.status(400).json("Server didn't get any user input data");
    return;
  }
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
  if(!Object.keys(data).length) {
    res.status(400).json("Server didn't get any user data");
    return;
  }
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
        result.username = checkEmailExist.username;
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
  if(!Object.keys(data).length) {
    res.status(400).json("Server didn't get any user data");
    return;
  }
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
      console.log(checkPassword);
      if (!checkPassword) {
        result.errCode = 2;
        result.message = 'Wrong password';
        resolve(result);
        return;
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
  res.status(200).json("Logout success")
}

let sendToken = async (req, res) => {
  let data = req.body;
  if(!Object.keys(data).length) {
    res.status(400).json("Server didn't get any user data");
    return;
  }
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
        attributes: ["token_String", "exp_date", "id"],
        where: {
          user_id: user_id,
        },
      });
      let now = new Date();
      let exp_token = new Date(getTokenFromUser.exp_date);
      if (exp_token > now) {
        // Nếu ngày tạo của token lớn hơn ngày hiện tại
        // Send token đến mail
        sendPasswordResetEmail(data.email, getTokenFromUser.token_String);
        result.errCode = false;
        result.message = "Token have send to your email";
      } else {
        // tạo lại token
        await db.VerifyToken.update({
          token_string: uuidv4(),
          exp_date: new Date(new Date().getTime() + 3 * 60 * 60 * 1000),
        }, {
          where: {
            id: getTokenFromUser.id,
          }
        });
        result.errCode = false;
        result.message = "Token have send to your email";
        sendPasswordResetEmail(data.email, getTokenFromUser.token_String);
      }
      resolve(result);
    } catch (e) {
      reject(e);
    }
  })
  res.status(200).json(respone);
}


let resetPassword = async (req, res) => {
  let data = req.body;
  if(!Object.keys(data).length) {
    res.status(400).json("Server didn't get any user data");
    return;
  }
  let respone = await new Promise(async (resolve, reject) => {
    try {
      let result = {};
      let updatePassword = await db.User.update({
        password: hashPassword(data.password)
      }, {
        where: {
          username: data.username
        }
      })
      result.errCode = false;
      result.message = "Update password success";
      resolve(result);
    } catch (e) {
      reject(e);
    }
  })
  res.status(200).json(respone);
}

let selectAllUsers = async (req, res) => {
  let pageNum = parseInt(req.query.pageNum);
  
  if(!pageNum) {
    pageNum = 1;
  }
  try {
    // Select user và role
    let data = {};
    let users = await db.sequelize.query(`SELECT users.id, users.username, users.email, users.is_active, roles.name, users.createdAt, users.updatedAt FROM users, roles WHERE users.role_id = roles.id`,
      { type: QueryTypes.SELECT }
    )
    if (!users.length) {
      res.status(200).json("There are no user in the system");
      return;
    }
    // Làm chức năng phân trang
    let pageSize = 7;
    let startIndex = (pageNum - 1) * pageSize;
    let totalLink = Math.ceil(users.length / pageSize);
    let result = await db.sequelize.query(`SELECT users.id, users.username, users.email, users.is_active, roles.name as rolename, users.createdAt, users.updatedAt FROM users, roles WHERE users.role_id = roles.id LIMIT ${startIndex} , ${pageSize}`, { type: QueryTypes.SELECT })
    if (!result.length) {
      data.errCode = 1;
      data.message = "There are no user in the system";
      res.status(200).json(data);
      return;
    }
    data.totalLink = totalLink;
    data.errCode = 0;
    data.message = 'Loading data suceessfully';
    data.data = result;
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error.message);
  }
}

module.exports = {
  createUser,
  userLogin,
  verifyEmail,
  userLogout,
  sendToken,
  resetPassword,
  selectAllUsers
}