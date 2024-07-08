import express from 'express'
import { authMiddleware } from "../middleware/auth.middleware.js";
import { createCheckoutSessionController } from '../controller/payment.controller.js';

const router = express.Router();

router.post("/create-checkout-session",authMiddleware, createCheckoutSessionController);
 
export default router; 