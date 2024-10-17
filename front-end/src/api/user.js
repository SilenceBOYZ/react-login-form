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

async function resetPassword(userData, userId, tokenString) {
  let data = await instance.post(`/api/user/reset-password?userId=${userId}&tokenString=${tokenString}`, userData);
  return data;
}

async function checkToken(userId, tokenString) {
  let data = await instance.get(`/api/user/reset-password/userId/${userId}/tokenString/${tokenString}`);
  return data;
}


async function logout() {
  let data = await instance.post("/api/user/logout");
  return data;
}

async function selectUsers(pageNum) {
  let data = await instance.get(`/api/user/select-user?pageNum=${pageNum}`);
  return data;
}

export {
  login,
  signup,
  logout,
  verify,
  sendToken,
  resetPassword,
  selectUsers,
  checkToken
} 
