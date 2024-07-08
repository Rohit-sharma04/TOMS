import mongoose, { Schema } from "mongoose";

const officerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    }, 
    password:{
        type:String,
        required:true
    },
    challan: [{ type: Schema.Types.ObjectId, ref: 'challan' }],
    complaint: [{ type: Schema.Types.ObjectId, ref: 'complaint' }],
});

const  officerModel= mongoose.model ("officer",officerSchema);
export default officerModel