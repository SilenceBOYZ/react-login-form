import instance from "../config/axios";

async function login(userData) {
  let data = await instance.post("/api/users/login", userData);
  return data;
}

async function signup(userData) {
  let data = await instance.post("/api/users/create-user", userData);
  return data;
}

async function logout() {
  let data = await instance.get("/api/users/logout");
  return data;
}

export {
  login,
  signup,
  logout
} 
