import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { challanStatusController, createOfficerController, deleteOfficerController, deleteUserController, getAllComplaintsController, getAllOfficersController, getAllUsersController, getChallanStatusDataController, getComplaintStatusDataController, getComplaintsOverTimeController, getMonthlyChallanDataController, updateComplaintController } from "../controller/admin.controller.js";

const router = express.Router();

router.get('/users',authMiddleware,getAllUsersController)
router.get('/officers',authMiddleware,getAllOfficersController)
router.get('/complaint',authMiddleware,getAllComplaintsController)
router.delete('/deleteUser/:userId',authMiddleware,deleteUserController)
router.put('/updateComplaint',authMiddleware,updateComplaintController)
router.post('/challan-status',authMiddleware , challanStatusController )
router.delete('/deleteOfficer/:officerId',authMiddleware,deleteOfficerController)
router.post('/createOfficer',authMiddleware , createOfficerController )
//API's for chart 
router.get('/total-challan-status-data',authMiddleware, getChallanStatusDataController);
router.get('/complaints-over-time',authMiddleware, getComplaintsOverTimeController);
router.get('/complaint-status-data',authMiddleware, getComplaintStatusDataController);
router.get('/monthly-challan-data',authMiddleware, getMonthlyChallanDataController);

export default router;
