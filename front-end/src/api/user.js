import instance from "../config/axios";

async function login(userData) {
  let data = await instance.post("/api/user/login", userData);
  return data;
}

async function signup(userData) {
  let data = await instance.post("/api/user/regist-user", userData);
  return data;
}

async function verify(userData) {
  let data = await instance.post("/api/user/verify-email", userData);
  return data;
}

async function sendToken(userData) {
  let data = await instance.post("/api/user/send-token", userData);
  return data;
}


async function logout() {
  let data = await instance.post("/api/user/logout");
  return data;
}

export {
  login,
  signup,
  logout,
  verify,
  sendToken
} 
