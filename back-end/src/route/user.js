const express = require("express");
const { createUser, userLogin, verifyEmail, userLogout, sendToken, resetPassword, selectAllUsers } = require("../controllers/user");
const { checkUserAccess } = require("../middleware/checkUserAccess");
const router = express.Router();

router.post('/regist-user', createUser);
router.post('/verify-email', verifyEmail);
router.post('/login', userLogin);
router.post('/logout', userLogout);
router.post('/send-token', sendToken);
router.post('/reset-password', resetPassword);
router.get('/select-user', checkUserAccess, selectAllUsers);

module.exports = router;