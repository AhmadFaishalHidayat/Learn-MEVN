import express from "express";
// import { registerUser } from "../controllers/authController.js";
import authController from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// post /api/v1/auth/register
router.post("/register", authController.registerUser);

// post /api/v1/auth/login
router.post("/login", authController.loginUser);

router.use(authMiddleware);
// get /api/v1/auth/logout
router.get("/logout", authController.logoutUser);

// get /api/v1/auth/getUser
router.get("/getUser", authController.getUser);

export default router;
