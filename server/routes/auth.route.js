import express from "express";
import { getUserDataController, loginController, signupController } from "../controller/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post('/signup',signupController)
router.post('/login',loginController)
router.get('/getuserData',authMiddleware ,getUserDataController)
export default router;