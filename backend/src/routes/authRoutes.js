import { Router } from "express";
import { register, login, getMe, logout } from "../controllers/authController.js";
import rateLimiter from "../middleware/rateLimiter.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register", rateLimiter, register); // http:5001/api/auth/register
router.post("/login", rateLimiter, login); // http:5001/api/auth/login
router.get("/me", authMiddleware, getMe);
router.post("/logout", logout);

export default router;