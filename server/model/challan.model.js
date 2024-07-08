import mongoose, { Schema } from "mongoose";

export const challanSchema = new Schema({
    address: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    challanVehicleNumber: {
        type: String,
        required: true,
    },
    officerId: {
        type: Schema.Types.ObjectId,
        ref:'officer',
        required: true
    },
    status: {
        type: String,
        default: "Pending",
    },
    fine: {
        type: Number,
        required: true
    },
    images: {
        type: [String],
        required: true
    }
},
    { timestamps: true }
);

export const challanModel = mongoose.model("challan", challanSchema);
