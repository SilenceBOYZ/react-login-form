import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import route from "./route/index.js";
import db from "./config/database.js"
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { Sequelize } from "sequelize";
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import path from "node:path";
    
const __dirname = dirname(fileURLToPath(import.meta.url) );

dotenv.config();

const PORT = process.env.PORT || 9000
const app = express();
const sequelize = new Sequelize('mysql', process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});


app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}))

app.use(cookieParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

const staticFile = path.join(__dirname, '../public');
app.use(express.static(staticFile));

route(app);
db.connection();

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

app.listen(PORT, () => {
  console.log("server is running on port ", PORT);
})
