import database from "../config/database.js";
import bcrypt from "bcrypt";
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const hashPassword = (userpassword) => {
  return bcrypt.hashSync(userpassword, salt);
}

function checkUserPassword(passwordRef, userPassword) {
  const match = bcrypt.compareSync(passwordRef, userPassword);
  return match;
}

// bcrypt.compareSync(myPlaintextPassword, hash); function to compare password in sync

const createUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let code = {};
      const { username, email, password, confirmPassword } = data;
      if (password != confirmPassword) {
        code.errCode = 2;
        code.errMessage = "Mật khẩu xác nhận không đúng";
        resolve(code);
      }
      let [rows] = await database.db.execute('SELECT * FROM USERS WHERE `email` = ? ', [email]);
      if (rows.length) {
        code.errCode = 1;
        code.errMessage = "Người dùng tồn tại trong hệ thống";
      } else {
        let userpassword = hashPassword(password);
        let queryString = "INSERT INTO USERS (username, email, password) VALUES (?, ?, ?)"
        await database.db.query(queryString, [username, email, userpassword]);
        code.errCode = 0;
        code.errMessage = "Đăng ký người dùng thành công";
      }
      resolve(code);
    } catch (e) {
      reject(e);
    }
  })
}

const checkUserExist = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let code = {};
      let [user] = await database.db.query('SELECT * FROM USERS WHERE `email` = ? ', [email]);
      if (!user.length) {
        code.errCode = 1;
        code.errMessage = "Người dùng không tồn tại trong hệ thống";
      } else {
        let checkPassword = checkUserPassword(password, user[0].password);
        if (checkPassword) {
          code.errCode = 0;
          code.errMessage = "Đăng nhập thành công";
          code.data = user;
        } else {
          code.errCode = 2;
          code.errMessage = "Mật khẩu không chính xác";
        }
      }
      resolve(code);
    } catch (error) {
      reject(error);
    }
  })
}




export default {
  createUser,
  checkUserExist
}