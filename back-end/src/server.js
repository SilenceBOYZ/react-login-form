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
const session = require("express-session");
const redis = require("./config/redis.js");

const staticFile = path.join(__dirname, '../public');

app.use(express.static(staticFile));

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}))

redis.connect();
app.use(session({
  secret: 'keyboard cat',
  store: redis.store,
  resave: false,
  saveUninitialized: true, // false value Don't create session until something is stored
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  },
  rolling: false, // Disable session expiration refresh on each request
}));

app.use(cookieParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));

route(app);

app.listen(PORT, () => {
  console.log("server is running on port", PORT);
})
