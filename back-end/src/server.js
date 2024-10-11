const express = require("express");
const cors = require("cors");
const route = require("./route/index.js");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("node:path");
const { configDotenv } = require("dotenv");
configDotenv();
const PORT = process.env.PORT || 9000
const app = express();

const staticFile = path.join(__dirname, '../public');
app.use(express.static(staticFile));
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}))

app.use(cookieParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));
route(app);

app.listen(PORT, () => {
  console.log("server is running on port ", PORT);
})
