const express = require("express");
const { createUser, userLogin, verifyEmail } = require("../controllers/user");
const router = express.Router();

router.post('/regist-user', createUser);
router.post('/verify-email', verifyEmail);
router.post('/user-login', userLogin);

module.exports = router;