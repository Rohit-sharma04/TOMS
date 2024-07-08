import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { complaintController, complaintStatusController, getChallanStatusDataController, getComplaintStatusDataController, newChallanController } from "../controller/user.controller.js";

const router = express.Router();

router.post('/challan',authMiddleware,newChallanController)
router.post('/complaint',authMiddleware,complaintController)
router.get('/complaint-status',authMiddleware,complaintStatusController)
//API's for chart 
router.get('/user-challan-status-data',authMiddleware, getChallanStatusDataController);
router.get('/complaint-status-data',authMiddleware, getComplaintStatusDataController);
export default router;