import { handleUpload } from "../config/cloudinary.js";
import { challanModel } from "../model/challan.model.js";
import { complaintModel } from "../model/complaint.model.js";
import officerModel from "../model/officer.model.js";
import userModel from "../model/user.model.js";

export const newChallanController = async (req, res) => {
    try {
        req.body.challanVehicleNumber = req.body.challanVehicleNumber.replace(/ /g, "").toUpperCase();

        console.log("req body ", req.body)
        console.log("req files ", req.files)

        const images = [];
        for (const file of req.files) {
            const b64 = Buffer.from(file.buffer).toString("base64");
            const dataURI = "data:" + file.mimetype + ";base64," + b64;

            const cloudImage = await handleUpload(dataURI);
            // console.log("image uploaded to Cloudinary: ", cloudImage);
            images.push(cloudImage.secure_url);
        }

        const newChallan = new challanModel({ ...req.body, images: images, officerId: req.userId })
        await newChallan.save();

        // Find the user by vehicle number
        const user = await userModel.findOne({ vehicleNumber: req.body.challanVehicleNumber });

        if (!user) {
            res.status(404).json({ message: "User not found", success: false });
        }
        // Push the new challan into the user's challan array
        user.challan.push(newChallan._id);
        await user.save();

        const officer = await officerModel.findById(req.userId);
        officer.challan.push(newChallan._id)
        await officer.save()

        res.status(201).json({ message: "Challan created successfully", success: true });

    } catch (error) {
        res.status(500).json({ message: `Error during challan creation: ${error.message}`, success: false });
    }
}

export const challanStatusController = async (req, res) => {
    try {
        const { option } = req.body;

        const officer = await officerModel.findById(req.userId).populate({
            path: 'challan',
            match: { status: option } // Filter challans by status
        });

        if (!officer) {
            return res.status(404).json({ message: "Officer not found", success: false });
        }

        const challans = officer.challan;

        res.status(200).json({ message: `Challans with status ${option} retrieved successfully`, data: challans, success: true });
    } catch (error) {
        res.status(500).json({ message: `Error retrieving challans: ${error.message}`, success: false });
    }
};

export const assignedComplaintsController = async (req, res) => {
    try {
        const officer = await officerModel.findById(req.userId).populate("complaint");
        console.log("complaints",officer.complaint)
        res.status(200).json({ message: 'List of unresolved complaints retrieved successfully', data: officer.complaint, success: true });
    } catch (error) {
        res.status(500).json({ message: `Error retrieving unresolved complaints: ${error.message}`, success: false });
    }
}

export const updateComplaintsController =async (req,res)=>{
    const { _id, status ,remark} = req.body;
    console.log("updateComplaintsController", _id, status)
    try {
        const updatedComplaint = await complaintModel.findByIdAndUpdate(_id, { status ,remark}, { new: true });
        console.log("updateComplaintsController",updatedComplaint)
        res.json({ success: true, data: updatedComplaint });
    } catch (error) {
        res.json({ success: false, message: `Error updating complaint: ${error.message}` });
    }
} 

export const updateChallanController =async (req,res)=>{
  
    const { _id, address, date, time, description, challanVehicleNumber, fine } = req.body;
    try {
        const updatedChallan = await challanModel.findByIdAndUpdate(_id, { address, date, time, description, challanVehicleNumber, fine }, { new: true });
        console.log("updateChallanController",updatedChallan)
        res.json({ success: true, data: updatedChallan });
    } catch (error) {
        res.json({ success: false, message: `Error updating challan: ${error.message}` });
    }
}

export const getChallanByIdController = async (req, res) => {
    const { challanId } = req.params;
    console.log("getChallanByIdController")
    try {
        const challan = await challanModel.findById(challanId);

        if (!challan) {
            return res.status(404).json({ success: false, message: 'Challan not found' });
        }

        res.json({ success: true, data: challan });
    } catch (error) {
        console.error('Error fetching challan:', error);
        res.status(500).json({ success: false, message: `Error fetching challan: ${error.message}` });
    }
};


// CHART CONTROLLERS
export const getChallanStatusDataController = async (req, res) => {
    try {
        const userId = req.userId;

        const officer = await officerModel.findById(userId).populate('challan');

        if (!officer) {
            return res.status(404).json({
                message: `Officer not found`,
                success: false
            });
        }

        const officerChallans = officer.challan;
        // Aggregate the status counts from the user's challans
        const statusCounts = officerChallans.reduce((acc, challan) => {
            const status = challan.status;
            acc[status] = (acc[status] || 0) + 1;
            return acc;
        }, {});
        console.log("statusCounts", statusCounts)
        const pendingCount = statusCounts["Pending"] || 0;
        const completedCount = statusCounts["Completed"] || 0;

        res.status(200).json({
            message: `User's challan status counts retrieved successfully`,
            data: { pendingCount, completedCount },
            success: true
        });

    } catch (error) {
        console.error('Error fetching officer challan status data:', error);
        res.status(500).json({ success: false, message: `Error fetching officer challan status data: ${error.message}` });
    }
}

export const getComplaintStatusDataController = async (req, res) => {
    try {

        const userId = req.userId;

        const officer = await officerModel.findById(userId).populate('complaint');

        if (!officer) {
            return res.status(404).json({
                message: `officer not found`,
                success: false
            });
        }
        // Initialize the status map with all possible statuses set to 0
        const statusMap = {
            'Pending': 0,
            'In Progress': 0,
            'Resolved': 0,
            'Rejected': 0,
            'Under Review': 0
        };

        // Iterate through the user's complaints and update the status counts
        officer.complaint.forEach(complaint => {
            statusMap[complaint.status]++;
        });

        // Create an array of counts in the order of the statuses
        const data = [
            statusMap['Pending'],
            statusMap['In Progress'],
            statusMap['Resolved'],
            statusMap['Rejected'],
            statusMap['Under Review']
        ];

        console.log("data", data)
        res.status(200).json({ success: true, data });
    } catch (error) {
        console.error('Error fetching complaint status data:', error);
        res.status(500).json({ success: false, message: `Error fetching complaint status data: ${error.message}` });
    }
};

