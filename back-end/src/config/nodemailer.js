const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_USEREMAIL,
    pass: process.env.NODEMAILER_USERPASS,
  },
})

module.exports = transporter;

