import UserSevices from "../services/UserServcies.js"
import { generateToken } from "../utils/generatesToken.js";

const createUser = async (req, res) => {
  let data = req.body;
  let respone = await UserSevices.createUser(data);
  res.status(200).json(respone)
}

const login = async (req, res) => {
  let { email, password } = req.body;
  let respone = await UserSevices.checkUserExist(email, password);
  if (respone.errCode === 0) {
    let userToken = generateToken(respone.data[0].id);
    await res.cookie("jwt-token", userToken, {
      maxAge: 24 * 1000,
      httpOnly: true,
      sameSite: "Strict",
      secure: true,
    })
  }
  res.status(200).json(respone);
}

const logout = async (req, res) => {
  await res.clearCookie("jwt-token");
  res.status(200).json("Đăng xuất người dùng ra hệ thống")
}

export {
  createUser,
  login,
  logout
} 