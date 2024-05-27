import userRoute from "./userRoute.js"

const route = (app) => {
  app.use("/api/users", userRoute)
}

export default route