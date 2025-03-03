import express from "express";
import authController from "../controllers/authController.js";
const router = express.Router();

// post /api/v1/auth/register
router.post("/register", authController.registerUser);

// post /api/v1/auth/login
router.post("/login", authController.loginUser);

// get /api/v1/auth/logout
router.get("/logout", authController.logoutUser);

// get /api/v1/auth/getUser
router.get("/getUser", authController.getUser);

export default router;
