const userRoute = require("./user.js");
const roleRoute = require("./role.js");

const route = (app) => {
  app.use("/api/user", userRoute)
  app.use("/api/role", roleRoute)
}

module.exports = route;