const db = require("../models/index");
const { QueryTypes } = require('sequelize');
const { hashPassword, compareHash } = require("../utils/hashPassword");
const { generateToken } = require("../services/jsonwebtoken");
const { v4: uuidv4 } = require('uuid');
const { sendPasswordResetEmail } = require("../services/nodemailer");

const createUser = async (req, res) => {
  const data = req.body;
  if (!Object.keys(data).length) {
    res.status(400).json("Server didn't get any user input data");
    return;
  }
  const result = {};
  try {
    const checkEmailExist = await db.User.findOne({
      where: {
        email: data.email
      }
    });
    if (checkEmailExist) {
      result.errCode = true;
      result.message = "The email have been existed";
      res.status(200).json(result);
      return;
    };

    const checkUserExist = await db.User.findOne({
      where: {
        username: data.username,
      }
    })
    if (checkUserExist) {
      result.errCode = true;
      result.message = "The user have been existed";
      res.status(200).json(result);
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

    const { token_string } = await db.VerifyToken.create({
      token_string: uuidv4(),
      // Set the exp for token (3 hour)
      exp_date: new Date(new Date().getTime() + 3 * 60 * 60 * 1000),
      user_id: userId,
    });

    await sendPasswordResetEmail(newUser.email, token_string);
    result.errCode = false;
    result.message = "Create user successfully";

  } catch (err) {
    res.status(400).json("Error in create user feature: " + err.message);
    return;
  }
  res.status(200).json(result);
}

const verifyEmail = async (req, res) => {
  const data = req.body;
  if (!Object.keys(data).length) {
    res.status(400).json("Server didn't get any user data");
    return;
  }

  const result = {};
  try {
    const checkEmailExist = await db.User.findOne({
      where: {
        email: data.email
      }
    });
    // Check Email exist in our system
    // Avoid sending token or link for everyone
    if (!checkEmailExist) {
      result.errCode = true;
      result.message = "The email doesn't exist";
      resolve(result);
      return;
    };

    const user_id = parseInt(checkEmailExist.id);
    const getTokenFromUser = await db.VerifyToken.findOne({
      attributes: ["token_String"],
      where: {
        user_id: user_id,
      },
    });

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
  } catch (err) {
    res.status(400).json("Error from verify email feature: " + err.message);
    return;
  }
  res.status(200).json(result);
}

const userLogin = async (req, res) => {
  const data = req.body;
  if (!Object.keys(data).length) {
    res.status(400).json("Server didn't get any user data");
    return;
  }

  const result = {};
  try {
    const user = await db.User.findOne({
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

    const checkPassword = compareHash(data.password, user.password);

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
  } catch (err) {
    res.status(400).json("Error in login feature: " + err.message);
    return;
  }
  res.status(200).json(result);
}

const userLogout = async (req, res) => {
  try {
    await req.session.destroy();
    res.status(200).json("Logout success");
  } catch (err) {
    res.status(400).json("Error in logout system: " + err.message);
    return;
  }
}

const sendToken = async (req, res) => {
  const data = req.body;
  if (!Object.keys(data).length) {
    res.status(400).json("Server didn't get any user data");
    return;
  }
  const result = {};
  try {
    const checkEmailExist = await db.User.findOne({
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
    const user_id = parseInt(checkEmailExist.id);
    const getTokenFromUser = await db.VerifyToken.findOne({
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
      await sendPasswordResetEmail(data.email, getTokenFromUser.token_String);
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
      await sendPasswordResetEmail(data.email, getTokenFromUser.token_String);
      result.errCode = false;
      result.message = "Token have send to your email";
    }
  } catch (err) {
    res.status(400).json("Error in send token feature: " + err.message);
    return;
  }
  res.status(200).json(result);
}

const resetPassword = async (req, res) => {
  const data = req.body;
  if (!Object.keys(data).length) {
    res.status(400).json("Server didn't get any user data");
    return;
  }
  const result = {};
  try {
    const updatePassword = await db.User.update({
      password: hashPassword(data.password)
    }, {
      where: {
        username: data.username
      }
    })
    result.errCode = false;
    result.message = "Update password success";
  } catch (err) {
    res.status(400).json("Error in reset password feature: " + err.message);
    return;
  }
  res.status(200).json(result);
}

const selectAllUsers = async (req, res) => {
  const pageNum = parseInt(req.query.pageNum);
  if (!pageNum) {
    pageNum = 1;
  }
  const result = {};
  try {
    // Select user và role
    const totalUserRecords = await db.User.findAll();
    if (!totalUserRecords.length) {
      res.status(200).json("There are no user in the system");
      return;
    }
    // Pagination Feature
    const pageSize = 7;

    let startIndex = (pageNum - 1) * pageSize;
    let totalLink = Math.ceil(totalUserRecords.length / pageSize);

    const userRecords = await db.sequelize.query(`SELECT users.id, users.username, users.email, users.is_active, roles.name as rolename, users.createdAt, users.updatedAt FROM users, roles WHERE users.role_id = roles.id LIMIT ${startIndex} , ${pageSize}`, { type: QueryTypes.SELECT })
    if (!userRecords.length) {
      result.errCode = true;
      result.message = "There are no user in the system";
      res.status(200).json(result);
      return;
    }
    result.totalLink = totalLink;
    result.errCode = false;
    result.message = 'Loading data suceessfully';
    result.data = userRecords;
  } catch (err) {
    res.status(400).json("Error select user all records feature: ", err.message);
  }
  res.status(200).json(result);
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