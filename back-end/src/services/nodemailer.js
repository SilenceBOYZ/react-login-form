const transporter = require("../config/nodemailer");

// Method to send token to email
const sendPasswordResetEmail = async (email, resetToken) => {
  try {
    // fix this line of code #####
    let message =
      `<p>Please use the below token to reset your password</code> api route:</p>
    <p><strong>Your token string: </strong><code>${resetToken}</code></p>`;

    const mailOption = {
      from: process.env.NODEMAILER_EMAILFROM,
      to: email,
      subject: "Reset password link",
      html: message,
    }
    
    // nodemailer's method to send mail
    await transporter.sendMail(mailOption);
  } catch (err) {
    console.log("Error in nodemailer services: " + err.message);
    return;
  }
}

module.exports = {
  sendPasswordResetEmail,
}