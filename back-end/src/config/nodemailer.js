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


// Phương thức để email 
let sendEmail = async ({ to, subject, html, from = process.env.NODEMAILER_EMAILFROM }) => {
  await transporter.sendMail({ from, to, subject, html });
  console.log("Email sent sucessfully");
}

// Phương thức để gọi ở api
let sendPasswordResetEmail = async (email, resetToken) => {
  let message =
    `<p>Please use the below token to reset your password</code> api route:</p>
    <p><strong>Your token string: </strong><code>${resetToken}</code></p>`;

  await sendEmail({
    from: process.env.NODEMAILER_EMAILFROM,
    to: email,
    subject: 'Reset your password',
    html: `<h4>Reset Password Token</h4>
    ${message}`
  })
}

module.exports = {
  sendPasswordResetEmail,
}
