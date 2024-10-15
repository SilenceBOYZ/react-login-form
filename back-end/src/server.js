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

const RedisStore = require("connect-redis").default; // default lo  calhost
const {createClient} = require('redis');
// Initialize client.
let redisClient = createClient()
redisClient.connect().then(
  console.log("Connect to redis success")
).catch(console.error)

let redisStore = new RedisStore({
  client: redisClient,
});

const staticFile = path.join(__dirname, '../public');
app.use(express.static(staticFile));
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}))

app.use(session({
  secret: 'keyboard cat',
  store: redisStore,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 60 * 60 * 1000
  }
}));

app.use(cookieParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));


route(app);

app.listen(PORT, () => {
  console.log("server is running on port ", PORT);
})
