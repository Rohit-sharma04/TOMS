import { challanModel } from "../model/challan.model.js";
import { complaintModel } from "../model/complaint.model.js";
import officerModel from "../model/officer.model.js";
import userModel from "../model/user.model.js";
import bcrypt from "bcryptjs";
import { fillMissingMonths, getMonthYearLabel } from "../utils/helperFunctions.js";

export const getAllUsersController = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json({ message: 'Users retrieved successfully', data: users, success: true });
    } catch (error) {
        res.status(500).json({ message: `Error fetching users: ${error.message}`, success: false });
    }
};

export const deleteUserController = async (req, res) => {
    try {
        const userId = req.params.userId;
        // Check if the user exists
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }
        // Delete the user
        await userModel.findByIdAndDelete(userId);
        res.status(200).json({ message: 'User deleted successfully', success: true });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: `Error deleting user: ${error.message}`, success: false });
    }
};

export const getAllComplaintsController = async (req, res) => {
    try {
        // Find all complaints that are neither resolved nor rejected
        const complaints = await complaintModel.find({ status: { $nin: ['Resolved', 'Rejected'] } }).populate('assignedTo', 'email');
        console.log("complaints",complaints)
        res.status(200).json({ message: 'List of unresolved complaints retrieved successfully', data: complaints, success: true });
    } catch (error) {
        res.status(500).json({ message: `Error retrieving unresolved complaints: ${error.message}`, success: false });
    }
};

export const updateComplaintController = async (req, res) => {
    try {
        const updatedData = req.body;
        const officerEmail = req.body.assignedOfficerEmail;
        
        let updatedComplaint;

        if (officerEmail) {
            // Find the officer by email
            const officer = await officerModel.findOne({ email: officerEmail });
            if (!officer) {
                return res.status(200).json({ message: 'Officer not found', success: false });
            }
            // Update the complaint using Mongoose with assigned officer
            updatedComplaint = await complaintModel.findByIdAndUpdate(
                updatedData._id,
                {
                    status: req.body.status,
                    assignedTo: officer._id
                },
                { new: true }
            );

            // Add the complaint to the officer's complaint list if not already present
            if (!officer.complaint.includes(updatedData._id)) {
                officer.complaint.push(updatedData._id);
                await officer.save();
            }
        } else {
            // Update only the complaint status if no officer email is provided
            updatedComplaint = await complaintModel.findByIdAndUpdate(
                updatedData._id,
                { status: req.body.status },
                { new: true }
            );
        }

        // Check if the complaint was found and updated
        if (!updatedComplaint) {
            return res.status(200).json({ message: 'Complaint not found', success: false });
        }

        res.status(200).json({ message: 'Complaint updated successfully', data: updatedComplaint, success: true });

    } catch (error) {
        console.error('Error updating complaint:', error);
        res.status(500).json({ message: `Error updating complaint: ${error.message}`, success: false });
    }
}


export const getAllOfficersController = async (req, res) => {
    try {
        const officers = await officerModel.find();
        res.status(200).json({ message: 'officers retrieved successfully', data: officers, success: true });
    } catch (error) {
        res.status(500).json({ message: `Error fetching users: ${error.message}`, success: false });
    }
};

export const challanStatusController = async (req, res) => {
    try {
        const { option } = req.body;
        const challans = await challanModel.find({ status: option })

        res.status(200).json({ message: `Challans with status ${option} retrieved successfully`, data: challans, success: true });
    } catch (error) {
        res.status(500).json({ message: `Error retrieving challans: ${error.message}`, success: false });
    }
};

export const deleteOfficerController = async (req, res) => {
    try {
        const officerId = req.params.officerId;
        // Check if the officer exists
        const officer = await officerModel.findById(officerId);
        if (!officer) {
            return res.status(404).json({ message: 'Officer not found', success: false });
        }
        // Delete the officer
        await officerModel.findByIdAndDelete(officerId);
        res.status(200).json({ message: 'Officer deleted successfully', success: true });
    } catch (error) {
        console.error('Error deleting officer:', error);
        res.status(500).json({ message: `Error deleting officer: ${error.message}`, success: false });
    }
};

export const createOfficerController = async (req, res) => {
    console.log(req.body);
    try {
        let { name, email, password } = req.body;

        const officer = await officerModel.findOne({ email });

        if (officer) {
            return res
                .status(200)
                .json({ message: "Officer Already Exist", success: false });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newOfficer = new officerModel({ name, email, password: hashedPassword });

        await newOfficer.save();

        res.status(201).json({ message: "Register Sucessfully", success: true });
    } catch (error) {
        return res.status(500).json({ message: `Error registering Officer: ${error.message}`, success: false });
    }
}

// CHART CONTROLLERS
export const getChallanStatusDataController = async (req, res) => {
    try {
        const statusCounts = await challanModel.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ]);
        console.log("statusCounts",statusCounts)
        const statusData = statusCounts.reduce((acc, item) => {
            acc[item._id] = item.count;
            return acc;
        }, {});

        console.log("statusData",statusData)


        const pendingCount = statusData["Pending"] || 0;
        const completedCount = statusData["Completed"] || 0;

        res.status(200).json({
            message: `Challan status counts retrieved successfully`,
            data: { pendingCount, completedCount },
            success: true
        });

    } catch (error) {
        console.error('Error fetching challan status data:', error);
        res.status(500).json({ success: false, message: `Error fetching challan status data:: ${error.message}` });
    }
}

export const getComplaintsOverTimeController = async (req, res) => {
    try {
        const now = new Date();
        const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);

        console.log('Filtering data between:', sixMonthsAgo, 'and', now);

        const startDate = sixMonthsAgo.toISOString().split('T')[0];
        const endDate = now.toISOString().split('T')[0];

        const monthlyData = await complaintModel.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: sixMonthsAgo,
                        $lte: now
                    }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" }
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { "_id.year": 1, "_id.month": 1 }
            }
        ]);

        console.log("monthlyData", monthlyData);

        const filledData = fillMissingMonths(monthlyData, sixMonthsAgo, now);

        console.log("filledData", filledData);
        const transformedData = filledData.map(item => ({
            label: getMonthYearLabel(item._id.month, item._id.year),
            count: item.count
        }));

        console.log("transformedData", transformedData);
        const labels = transformedData.map(item => item.label);
        const counts = transformedData.map(item => item.count)

        res.status(200).json({ success: true, data: { labels, counts } });
    } catch (error) {
        console.error('Error fetching monthly complaint data:', error);
        res.status(500).json({ success: false, message: `Error fetching monthly complaint data: ${error.message}` });
    }
};

export const getComplaintStatusDataController = async (req, res) => {
    try {
        const statusCounts = await complaintModel.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ]);

        const statusMap = {
            'Pending': 0,
            'In Progress': 0,
            'Resolved': 0,
            'Rejected': 0,
            'Under Review': 0
        };

        statusCounts.forEach(item => {
            statusMap[item._id] = item.count;
        });

        const data = [
            statusMap['Pending'],
            statusMap['In Progress'],
            statusMap['Resolved'],
            statusMap['Rejected'],
            statusMap['Under Review']
        ];
        console.log("datA", data)
        res.status(200).json({ success: true, data });
    } catch (error) {
        console.error('Error fetching complaint status data:', error);
        res.status(500).json({ success: false, message: `Error fetching complaint status data: ${error.message}` });
    }
};

export const getMonthlyChallanDataController = async (req, res) => {
    try {
        const now = new Date();
        const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);

        console.log('Filtering data between:', sixMonthsAgo, 'and', now);

        const startDate = sixMonthsAgo.toISOString().split('T')[0];
        const endDate = now.toISOString().split('T')[0];

        const monthlyData = await challanModel.aggregate([
            {
                $match: {
                    date: {
                        $gte: startDate,
                        $lte: endDate
                    }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: { $dateFromString: { dateString: "$date" } } },
                        month: { $month: { $dateFromString: { dateString: "$date" } } }
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { "_id.year": 1, "_id.month": 1 }
            }
        ]);

        console.log("monthlyData", monthlyData);

        const filledData = fillMissingMonths(monthlyData, sixMonthsAgo, now);

        console.log("filledData", filledData);
        const transformedData = filledData.map(item => ({
            label: getMonthYearLabel(item._id.month, item._id.year),
            count: item.count
        }));

        console.log("transformedData", transformedData);
        const labels = transformedData.map(item => item.label);
        const counts = transformedData.map(item => item.count);

        res.status(200).json({ success: true, data: { labels, counts } });
    } catch (error) {
        console.error('Error fetching monthly challan data:', error);
        res.status(500).json({ success: false, message: `Error fetching monthly challan data: ${error.message}` });
    }
};


