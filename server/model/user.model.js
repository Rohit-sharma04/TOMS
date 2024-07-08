import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }, 
    vehicleNumber: {
        type: String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    challan: [{ type: Schema.Types.ObjectId, ref: 'challan' }],
    complaints:[{ type: Schema.Types.ObjectId, ref: 'complaint' }],
});

const  userModel= mongoose.model("user",userSchema);
export default userModel