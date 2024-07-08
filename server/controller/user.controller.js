import { handleUpload } from "../config/cloudinary.js";
import { complaintModel } from "../model/complaint.model.js";
import userModel from "../model/user.model.js";

export const newChallanController = async (req, res) => {
    try {
        // Find the user by vehicle number
        console.log(req.body.option)
        const user = await userModel.findById(req.userId).populate('challan');

        if (!user) {
            // Retrieve challan information from the user model
            res.status(404).json({ message: "User not found", success: false });
        }
        const { option } = req.body;

        // Filter challans based on the status option
        const filteredChallans = user.challan.filter(challan => challan.status === option);

        res.status(200).json({ message: "Challan information retrieved successfully", data: filteredChallans, success: true });
    } catch (error) {
        res.status(500).json({ message: `Error retrieving challan information: ${error.message}`, success: false });
    }
};

export const complaintController = async (req, res) => {
    try {
        const user = await userModel.findById(req.userId);
        if (!user) {
            res.status(401).json({ message: '401 Unauthorized Access', success: false })
        }

        // Check if the provided challan ID exists in the user's challan array
        const challanExists = user.challan?.includes(req.body.challanId);

        if (!challanExists) {
            console.log('invalid challan')
            // Respond with an error if the challan ID is not found in the user's challan array
            return res.status(200).json({ message: 'Invalid Challan ID', success: false });
        }

        const images = [];
        for (const file of req.files) {
            const b64 = Buffer.from(file.buffer).toString("base64");
            const dataURI = "data:" + file.mimetype + ";base64," + b64;

            const cloudImage = await handleUpload(dataURI);
            console.log("image uploaded to Cloudinary: ", cloudImage);
            images.push(cloudImage.secure_url);
        }

        const complaint = new complaintModel({ ...req.body, images: images, complaintVehicleNumber: user.vehicleNumber })
        await complaint.save();

        user.complaints.push(complaint._id);
        await user.save();
        console.log("complaint registered")
        res.status(201).json({ message: "complaint registered successfully", success: true });


    } catch (error) {
        console.log("Error in saving the complaint : ", error);
        res.status(500).json({ message: `Error during complaint registeration: ${error.message}`, success: false });
    }
}

export const complaintStatusController = async (req, res) => {
    try {
        const { userId } = req;

        // Find the user
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }

        // Populate complaints associated with the user
        await user.populate('complaints');

        // Extract complaint data
        const complaintStatuses = user.complaints

        // Send the complaint statuses as a response
        res.status(200).json({ complaintStatuses, success: true });

    } catch (error) {
        console.log("Error in getting complaints status : ", error);
        res.status(500).json({ message: `Error in getting complaints status: ${error.message}`, success: false });
    }
}

// CHART CONTROLLERS
export const getChallanStatusDataController = async (req, res) => {
    try {
        const userId = req.userId; 
        
        const user = await userModel.findById(userId).populate('challan');
        
        if (!user) {
            return res.status(404).json({
                message: `User not found`,
                success: false
            });
        }

        const userChallans = user.challan;
        // Aggregate the status counts from the user's challans
        const statusCounts = userChallans.reduce((acc, challan) => {
            const status = challan.status;
            acc[status] = (acc[status] || 0) + 1;
            return acc;
        }, {});

        const pendingCount = statusCounts["Pending"] || 0;
        const completedCount = statusCounts["Completed"] || 0;

        res.status(200).json({
            message: `User's challan status counts retrieved successfully`,
            data: { pendingCount, completedCount },
            success: true
        });

    } catch (error) {
        console.error('Error fetching user challan status data:', error);
        res.status(500).json({ success: false, message: `Error fetching user challan status data: ${error.message}` });
    }
}

export const getComplaintStatusDataController = async (req, res) => {
    try {
        
        const userId = req.userId; 
        
        const user = await userModel.findById(userId).populate('complaints');
        
        if (!user) {
            return res.status(404).json({
                message: `User not found`,
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
        user.complaints.forEach(complaint => {
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

