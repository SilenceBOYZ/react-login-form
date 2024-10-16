const express = require("express");
const { createUser, userLogin, verifyEmail, userLogout, sendToken, resetPassword, selectAllUsers, tokenIsValid } = require("../controllers/user");
const { checkUserAccess } = require("../middleware/checkUserAccess");
const { validateInputData } = require("../middleware/ValidateInputData");
const router = express.Router();

router.post('/regist-user', validateInputData, createUser);
router.get('/verify-email/userId/:userId/tokenString/:tokenString', verifyEmail);
router.post('/login', validateInputData, userLogin);
router.post('/logout', validateInputData, userLogout);
router.post('/send-token', validateInputData, sendToken);
router.get('/check-token-valid/userId/:userId/tokenString/:tokenString', tokenIsValid);
router.post('/reset-password', validateInputData, resetPassword);
router.get('/select-user', checkUserAccess, selectAllUsers);

module.exports = router;