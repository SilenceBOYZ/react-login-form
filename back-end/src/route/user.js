const express = require("express");
const { createUser, userLogin, verifyEmail, userLogout, sendToken, resetPassword } = require("../controllers/user");
const router = express.Router();

router.post('/regist-user', createUser);
router.post('/verify-email', verifyEmail);
router.post('/login', userLogin);
router.post('/logout', userLogout);
router.post('/send-token', sendToken);
router.post('/reset-password', resetPassword);

module.exports = router;