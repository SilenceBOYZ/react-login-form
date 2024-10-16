const transporter = require("../config/nodemailer");

// Method to send token to email
const sendPasswordResetEmail = async (email, userId, resetToken) => {
  try {
    // fix this line of code #####
    let message =
      `
      <div style="border:1px solid #e6e6e6;padding:20px;width:fit-content;margin:0 auto">
      <h1 style="font-family:Inter,Arial;font-size:18px;font-weight:600;line-height:20px;text-align:left;color:#212121" >Welcom to CODESTRINGERS</h1>
      <h2 style="font-weight:600;margin:16px 0 32px 0;text-align:left">Hey ${email}, here is the link to reset our password</h2>
      <p>Reset your email enables you to collaborate seamlessly on our system and helps us keep your account secure.</p>
      <a style="padding:12px 16px;display:block;width:fit-content;text-decoration:none;border:1px solid #ff6c37;font-weight:600;font-size:14px;font-family:'Open Sans',sans-serif;color:#fff;background:#ff6c37;border-radius:5px;line-height:17px;margin:24px 0;text-align:left"
         href="http://localhost:8080/api/user/check-token-valid/userId/${userId}/tokenString/${resetToken}"
      >
        Submit
      </a>
     </div>
      `;

    const mailOption = {
      from: process.env.NODEMAILER_EMAILFROM,
      to: email,
      subject: "Reset your password account",
      html: message,
    }

    // nodemailer's method to send mail
    await transporter.sendMail(mailOption);
  } catch (err) {
    console.log("Error in nodemailer services: " + err.message);
    return;
  }
}

const sendLinkToVerifyAccount = async (email, userId, tokenString) => {
  try {
    // fix this line of code #####
    let message =
      `
      <div style="border:1px solid #e6e6e6;padding:20px;width:fit-content;margin:0 auto">
      <h1 style="font-family:Inter,Arial;font-size:18px;font-weight:600;line-height:20px;text-align:left;color:#212121" >Welcom to CODESTRINGERS</h1>
      <h2 style="font-weight:600;margin:16px 0 32px 0;text-align:left">Hey ${email}, let's verify your email address</h2>
      <p>Verifying your email enables you to collaborate seamlessly on our system and helps us keep your account secure.</p>
      <a style="padding:12px 16px;display:block;width:fit-content;text-decoration:none;border:1px solid #ff6c37;font-weight:600;font-size:14px;font-family:'Open Sans',sans-serif;color:#fff;background:#ff6c37;border-radius:5px;line-height:17px;margin:24px 0;text-align:left"
         href="http://localhost:8080/api/user/verify-email/userId/${userId}/tokenString/${tokenString}"
      >
        Verify Email
      </a>
     </div>
      `;

    const mailOption = {
      from: process.env.NODEMAILER_EMAILFROM,
      to: email,
      subject: "Verify your email account",
      html: message,
    };

    // nodemailer's method to send mail
    await transporter.sendMail(mailOption);
  } catch (err) {
    console.log("Error in nodemailer services: " + err.message);
    return;
  }
}

module.exports = {
  sendPasswordResetEmail,
  sendLinkToVerifyAccount
}