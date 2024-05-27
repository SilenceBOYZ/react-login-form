import mysql from "mysql2/promise.js";
import dotenv from "dotenv";
dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 5000,
})

const connection = async () => {
  try {
    const conn = await db.getConnection();
    let [rows] = await conn.query("SHOW DATABASES LIKE ?", ["testing"]);
    if (!rows.length) {
      await conn.query("CREATE DATABASE IF NOT EXISTS SYSTEMS");
      console.log("Create database successfully");
    } else {
      console.log("Database is already existed");
    }
  } catch (error) {
    console.error(error.message);
  }
}


export default { connection, db };