import express from "express";
import { assignedComplaintsController, challanStatusController, getChallanByIdController, getChallanStatusDataController, getComplaintStatusDataController, newChallanController, updateChallanController, updateComplaintsController } from "../controller/officer.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post('/new-challan',authMiddleware, newChallanController)
router.post('/challan-status',authMiddleware , challanStatusController )
router.post('/challan-status',authMiddleware , challanStatusController )
router.get('/assigned-complaint',authMiddleware , assignedComplaintsController )
router.put('/updateComplaint',authMiddleware , updateComplaintsController )
router.put('/updateChallan',authMiddleware , updateChallanController )
router.get('/challan/:challanId',authMiddleware , getChallanByIdController )

//API's for chart 
router.get('/total-challan-status-data',authMiddleware, getChallanStatusDataController);
router.get('/complaint-status-data',authMiddleware, getComplaintStatusDataController);
export default router;