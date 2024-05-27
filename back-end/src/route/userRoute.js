import express from "express";
const router = express.Router();
import { createUser, login, logout } from "../controllers/UserController.js"

router.post("/create-user", createUser);
router.post("/login", login);
router.get("/logout", logout);

export default router;