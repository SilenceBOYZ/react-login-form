const express = require("express");
const { createUser, userLogin, verifyEmail, userLogout, sendToken } = require("../controllers/user");
const router = express.Router();

router.post('/regist-user', createUser);
router.post('/verify-email', verifyEmail);
router.post('/login', userLogin);
router.post('/logout', userLogout);
router.post('/send-token', sendToken);

module.exports = router;