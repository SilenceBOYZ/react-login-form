const db = require("../models/index");
const { QueryTypes, where, Op } = require('sequelize');
const { hashString, compareHash } = require("../utils/hashString");
const { generateToken, verifyToken: verify, verifyToken } = require("../services/jsonwebtoken");
const { v4: uuidv4 } = require('uuid');
const { sendPasswordResetEmail, sendLinkToVerifyAccount } = require("../services/nodemailer");
const { registValidate, loginValidate, emailValidate, usernameValidator } = require("../utils/validateData");

const createUser = async (req, res) => {
  const result = {};
  try {
    const data = await registValidate.validateAsync(req.body);
    const checkEmailExist = await db.User.findOne({
      where: {
        email: data.email
      }
    });

    if (checkEmailExist) {
      result.errCode = true;
      result.fieldError = "email";
      result.message = "The email has been existed";
    } else if (!checkEmailExist) {
      const checkUserExist = await db.User.findOne({
        where: {
          username: data.username,
        }
      })
      if (checkUserExist) {
        result.errCode = true;
        result.fieldError = "username";
        result.message = "The user has been existed";
      } else {
        // #### Insert user into table #### //
        const newUser = await db.User.create({
          username: data.username.toLowerCase(),
          email: data.email.toLowerCase(),
          password: hashString(data.password),
          role_id: 2,
        });

        const userId = parseInt(newUser.dataValues.id);

        const { token_string } = await db.VerifyToken.create({
          token_string: uuidv4(),
          // Set the exp for token (24 hour)
          exp_date: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
          user_id: userId,
        });

        const userIdToken = generateToken(userId);
        const hashTokenString = generateToken(token_string);

        // This will throw an error if email get error
        await sendLinkToVerifyAccount(newUser.email, userIdToken, hashTokenString);
        // Can you transaction the roll back email 
        // research later
        result.errCode = false;
        result.message = "Create user successfully";
      }
    }
    res.status(200).json(result);
  } catch (err) {
    if (err.isJoi === true) {
      result.errCode = true;
      result.message = err.message;
      res.status(200).json(result);
    } else {
      console.error("Error in create user feature: " + err.message);
      result.errCode = true;
      result.message = "Error in nodemailer: " + err.message;
      res.status(500).json(result);
    }
  }
}


const verifyEmail = async (req, res) => {
  // làm một cái check param
  const { userId: userTokenId, tokenString: token } = req.params;
  // const result = {};
  try {
    // get data after verify with jwt
    const userId = parseInt(verify(userTokenId).value);
    const tokenString = verify(token).value;

    const getTokenFromUser = await db.VerifyToken.findOne({
      attributes: ["token_String"],
      where: {
        user_id: userId,
      },
    });

    if (!getTokenFromUser) {
      // result = null;
      res.redirect(process.env.FRONTEND_HOST + "authentication/verify-error");
      return;
    }

    if (getTokenFromUser.token_String === tokenString) {
      await db.User.update({
        is_active: true,
      }, {
        where: {
          id: userId
        }
      });

      await db.VerifyToken.destroy({
        where: {
          token_String: tokenString,
        },
      });

      // result.errCode = false;
      // result.message = "Verify account successfully";
    } else {
      res.redirect(process.env.FRONTEND_HOST + "authentication/verify-error");
      return;
      // result.errCode = true;
      // result.message = "Invalid token string";
    }
    res.redirect(process.env.FRONTEND_HOST + "authentication/verify-success");
  } catch (err) {
    res.status(200).json("Error from verify email feature: " + err.message);
    return;
  }
}

const userLogin = async (req, res) => {
  const result = {};
  try {
    // validate inputs field
    const data = await loginValidate.validateAsync(req.body);
    const user = await db.User.findOne({
      where: {
        email: data.email,
      },
      raw: true,
    });

    if (!user) {
      result.errCode = true;
      result.fieldError = "email"
      result.message = "the email does not exist";
    } else {
      const checkPassword = compareHash(data.password, user.password);
      if (!checkPassword) {
        result.errCode = true;
        result.fieldError = "password"
        result.message = 'Wrong password';
      } else {
        if (!user.is_active) {
          result.errCode = true;
          result.status = 401;
          result.message = "User haven't verify email";
        } else {
          const accessToken = generateToken(user.id);
          req.session.userLogin = accessToken;
          result.errCode = false;
          result.data = accessToken;
          result.message = 'login successfully';
        }
      }
    }
    res.status(200).json(result);
  } catch (err) {
    if (err.isJoi === true) {
      result.errCode = true;
      result.message = err.message;
      res.status(200).json(result)
    } else {
      res.status(400).json("Error in login feature: " + err.message);
    }
  }
}

const userLogout = async (req, res) => {
  try {
    await req.session.destroy();
    res.status(200).json("Logout success");
  } catch (err) {
    res.status(200).json("Error in logout system: " + err.message);
    return;
  }
}

// Send to token to user email
const sendToken = async (req, res) => {
  try {
    const result = {};
    const email = await emailValidate.validateAsync(req.body.email);
    const checkEmailExist = await db.User.findOne({
      where: {
        email
      }
    });

    if (!checkEmailExist) {
      result.errCode = true;
      result.fieldError = "email";
      result.message = "The email doesn't exist";
      res.status(200).json(result);
      return;
    };

    const user_id = parseInt(checkEmailExist.id);

    const getTokenFromUser = await db.VerifyToken.findOne({
      attributes: ["token_String", "exp_date", "id"],
      where: {
        user_id: user_id,
      },
    });

    if (!getTokenFromUser) {
      const { token_string } = await db.VerifyToken.create({
        token_string: uuidv4(),
        // Set the exp for token (3 hour)
        exp_date: new Date(new Date().getTime() + 3 * 60 * 60 * 1000),
        user_id: user_id,
      });

      // generateToken sign jwt token
      await sendPasswordResetEmail(email, generateToken(user_id), generateToken(token_string));
      result.errCode = false;
      result.message = "Check your email account";
      res.status(200).json(result);
      return;
    }

    let now = new Date();
    let exp_token = new Date(getTokenFromUser.exp_date);
    if (exp_token < now) {
      // Nếu ngày tạo của token lớn hơn ngày hiện tại
      // Send token đến mail

      await db.VerifyToken.update({
        token_string: uuidv4(),
        exp_date: new Date(new Date().getTime() + 3 * 60 * 60 * 1000),
      }, {
        where: {
          id: getTokenFromUser.id,
        }
      });

      await sendPasswordResetEmail(email, generateToken(user_id), generateToken(getTokenFromUser.token_String));
      result.errCode = false;
      result.message = "the new token have send to your email";
    }
    else {
      await sendPasswordResetEmail(email, generateToken(user_id), generateToken(getTokenFromUser.token_String));
      result.errCode = false;
      result.message = "Token have send to your email";
    }
    res.status(200).json(result);
  } catch (err) {
    if (err.isJoi === true) {
      result.errCode = false;
      result.message = err.message;
      res.status(200).json(result);
    } else {
      res.status(200).json("Error in send token feature: " + err.message);
    }
  }
}

// Check token validate and send the link to reset password
const tokenIsValid = async (req, res) => {
  const { userId: userTokenId, tokenString: token } = req.params;
  try {
    const userId = parseInt(verify(userTokenId).value);
    const tokenString = verify(token).value;

    const checkTokenValid = await db.VerifyToken.findOne({
      where: {
        token_string: tokenString,
        user_id: userId
      }
    });

    if (!checkTokenValid) {
      res.redirect(process.env.FRONTEND_HOST + "authentication/verify-error");
    } else {
      let now = new Date();
      let exp_token = new Date(checkTokenValid.exp_date)
      if (exp_token < now) {
        // Check token expired
        res.redirect(process.env.FRONTEND_HOST + "authentication/verify-error");
        return;
      } else {
        res.redirect(process.env.FRONTEND_HOST + `authentication/reset-password?userId=${userTokenId}&tokenString=${tokenString}`);
      }
    }

  } catch (err) {
    res.status(200).json("Error from verify email feature: " + err.message);
    return;
  }
}

const checkUserHaveResetPassword = async (req, res) => {
  const { userId: userTokenId, tokenString: token } = req.params;
  const result = {};
  try {
    const userId = parseInt(verify(userTokenId).value);
    const tokenString = token;

    const checkTokenValid = await db.VerifyToken.findOne({
      where: {
        token_string: tokenString,
        user_id: userId
      }
    });

    if (!checkTokenValid) {
      result.errCode = true;
      result.message = "Expired or invalid token";
    } else {
      result.errCode = false;
      result.message = "Token valid";
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(200).json("Error from check user have reset password valid: " + err.message);
    return;
  }
}

const resetPassword = async (req, res) => {
  try {
    const data = req.body;
    const userId = parseInt(verifyToken(req.query.userId).value)
    const tokenString = req.query.tokenString;
    const result = {};

    const checkTokenValid = await db.VerifyToken.findOne({
      where: {
        token_string: tokenString,
        user_id: userId
      }
    });


    if (!checkTokenValid) {
      result.errCode = true;
      result.message = "Invalid Token or token expired";
      res.status(200).json(result);
      return;
    }

    const updatePassword = await db.User.update({
      password: hashString(data.password)
    }, {
      where: {
        id: userId,
      }
    });

    if (!updatePassword[0]) {
      result.errCode = true;
      result.message = "Update password failed";
      res.status(200).json(result);
    } else {
      await db.VerifyToken.destroy({
        where: {
          token_string: tokenString,
        }
      })
      result.errCode = false;
      result.message = "Update password success";
      res.status(200).json(result);
    }
  } catch (err) {
    res.status(200).json("Error in reset password feature: " + err.message);
    return;
  }
}

const selectAllUsers = async (req, res) => {
  const result = {};
  try {
    const pageNum = parseInt(req.query.pageNum);
    const name = await usernameValidator.validateAsync(req.query.username);
    if (!pageNum) {
      pageNum = 1;
    }
    const option = {};
    let queryOption = '';
    if (name && name.toLocaleLowerCase() != 'all') {
      option.where = {
        username: {
          [Op.like]: name + "%"
        }
      }
      queryOption = !name ? '' : ' AND users.username LIKE ' + `'${name + '%'}' `;
    }
    console.log(queryOption);
    const totalUserRecords = await db.User.findAll(option);


    if (!totalUserRecords.length) {
      res.status(200).json("There are no user in the system");
      return;
    }
    // Pagination Feature
    const pageSize = 10;

    let startIndex = (pageNum - 1) * pageSize;
    let totalLink = Math.ceil(totalUserRecords.length / pageSize);


    const userRecords = await db.sequelize.query(
      ` 
        SELECT users.id, users.username, users.email, 
        users.is_active, roles.name as rolename, users.createdAt, 
        users.updatedAt FROM users, roles 
        WHERE users.role_id = roles.id
        AND users.role_id NOT IN (1) ${queryOption}
        LIMIT ${startIndex} , ${pageSize}
      `,
      { type: QueryTypes.SELECT })

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
    res.status(200).json(result);

  } catch (err) {
    result.errCode = true;
    if (err.isJoi) {
      result.message = err.message;
      res.status(200).json(result);
    } else {
      res.status(200).json("Error select user all records feature: " + err.message);
    }
  }
}

const findUser = async (req, res) => {
  try {
    const result = {};
    const userId = verify(req.params.userId).value;
    const user = await db.User.findByPk(userId, {
      attributes: ["username", "role_id"]
    });
    if (!user) {
      result.errCode = true;
      result.message = "User does not exist";
    } else {
      const { rolename } = await db.Role.findOne({
        attributes: [['name', 'rolename']],
        where: {
          id: user.role_id,
        }
      });
      user.rolename = rolename;
      result.errCode = false;
      result.data = user;
      result.message = "Found a user";
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(200).json(err.message);
  }
}

module.exports = {
  tokenIsValid,
  createUser,
  userLogin,
  verifyEmail,
  userLogout,
  sendToken,
  resetPassword,
  selectAllUsers,
  checkUserHaveResetPassword,
  findUser
}