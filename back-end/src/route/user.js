const express = require("express");
const { createUser, userLogin, verifyEmail, userLogout, sendToken, resetPassword, selectAllUsers, tokenIsValid, checkUserHaveResetPassword, findUser } = require("../controllers/user");
const { checkUserAccess } = require("../middleware/checkUserAccess");
const { validateInputData } = require("../middleware/validateInputData");
const router = express.Router();

router.post('/regist-user', validateInputData, createUser);
router.get('/verify-email/userId/:userId/tokenString/:tokenString', verifyEmail);

router.post('/login', validateInputData, userLogin);
router.post('/logout', validateInputData, userLogout);

router.post('/send-token', validateInputData, sendToken);
router.get('/check-token-valid/userId/:userId/tokenString/:tokenString', tokenIsValid);
router.get('/reset-password/userId/:userId/tokenString/:tokenString', checkUserHaveResetPassword);
router.post('/reset-password', validateInputData, resetPassword);

router.get('/select-users', checkUserAccess, selectAllUsers);
router.post('/get-user/userId/:userId', checkUserAccess, findUser);

module.exports = router;