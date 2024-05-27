import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import route from "./route/index.js";
import db from "./config/database.js"
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

dotenv.config();

const PORT = process.env.PORT || 9000
const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}))
app.use(cookieParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

route(app);
db.connection();

app.listen(PORT, () => {
  console.log("server is running on port ", PORT);
})
