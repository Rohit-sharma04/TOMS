import mongoose, { Schema } from "mongoose";
const complaintStatusEnum = {
    PENDING: 'Pending',
    IN_PROGRESS: 'In Progress',
    RESOLVED: 'Resolved',
    REJECTED: 'Rejected',
    UNDER_REVIEW: 'Under Review'
};

export const complaintSchema = new Schema({
    challanId: {
        type: Schema.Types.ObjectId,
        ref: 'challan',
        required: true
    },
    complaintVehicleNumber: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: [String],
    remark: {
        type: String,
        default:null
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref:'officer'
    },
    status: {
        type: String,
        enum: Object.values(complaintStatusEnum),
        default: complaintStatusEnum.PENDING,
    }
},
    { timestamps: true }
)

export const complaintModel = mongoose.model("complaint", complaintSchema);
