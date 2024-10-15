const express = require("express");
const { createUser, userLogin, verifyEmail, userLogout, sendToken, resetPassword, selectAllUsers } = require("../controllers/user");
const { checkUserAccess } = require("../middleware/checkUserAccess");
const { validateInputData } = require("../middleware/ValidateInputData");
const router = express.Router();

router.post('/regist-user', validateInputData, createUser);
router.post('/verify-email', validateInputData, verifyEmail);
router.post('/login', validateInputData, userLogin);
router.post('/logout', validateInputData, userLogout);
router.post('/send-token', validateInputData, sendToken);
router.post('/reset-password', validateInputData, resetPassword);
router.get('/select-user', checkUserAccess, selectAllUsers);

module.exports = router;