import adminModel from "../model/admin.model.js";
import officerModel from "../model/officer.model.js";
import userModel from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

export const signupController = async (req, res) => {
    console.log(req.body);
    try {
        let { name, email, password, role, vehicleNumber } = req.body;
        vehicleNumber = vehicleNumber.replace(/ /g,"").toUpperCase();

        let user;
        if (role === 'user') {
            user = await userModel.findOne({ email });
        } else if (role === 'officer') {
            user = await officerModel.findOne({ email });
        } else if (role === 'admin') {
            user = await adminModel.findOne({ email });
        }
        if (user) {
            return res
                .status(200)
                .json({ message: "User Already Exist", success: false });
        }

        // const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user object based on their role
        let newUser;
        if (role === 'user') {
            newUser = new userModel({ name, email, password: hashedPassword, vehicleNumber });
        } else if (role === 'officer') {
            newUser = new officerModel({ name, email, password: hashedPassword });
        } else if (role === 'admin') {
            newUser = new adminModel({ name, email, password: hashedPassword });
        }

        // Save the new user to the database
        await newUser.save();

        res.status(201).json({ message: "Register Sucessfully", success: true });
    } catch (error) {
        return res.status(500).json({ message: `Error registering user: ${error.message}`, success: false });
    }
}

export const loginController = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        console.log("req.body",req.body)
        // find the user in database by his email
        let user;
        if (role === 'user') {
            user = await userModel.findOne({ email });
        } else if (role === 'officer') {
            user = await officerModel.findOne({ email });
        } else if (role === 'admin') {
            user = await adminModel.findOne({ email });
        }
        console.log("user",user)
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        // Check if the provided password matches the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password", success: false });
        }

        // Create a token and send it as response with http status 200
        const token = jwt.sign(
            { id: user._id, role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        const maxAgeInMilliseconds = 7*24*60*60*1000; // 7 days in milliseconds
       
        // res.cookie('token', token, { httpOnly: false , sameSite: 'None'});
        res.cookie('token', token, {
            httpOnly: false, 
            maxAge: maxAgeInMilliseconds,
            sameSite: 'none', // Important for cross-site cookies
            secure: process.env.NODE_MODE === 'production' // Ensure cookies are only sent over HTTPS
        });
        
        res.status(200).json({ message: "Login successful",  success: true, role });

    } catch(error) {
        res.status(500).json({ message: `Error during login: ${error.message}`, success: false });
    }

}

export const getUserDataController =async(req,res)=>{
    const { userId, role } = req;

    try {
        let userData;

        switch (role) {
            case 'admin':
                userData = await adminModel.findById(userId);
                break;
            case 'officer':
                userData = await officerModel.findById(userId);
                break;
            case 'user':
                userData = await userModel.findById(userId);
                break;
            default:
                return res.status(400).json({ message: 'Invalid role', success: false });
        }

        if (!userData) {
            return res.status(404).json({ message: 'User not found', success: false });
        }
        // Convert the Mongoose document to a plain JavaScript object
        userData = userData.toObject();
        userData.role = role;
        // console.log("userData=",userData);
        res.status(200).json({ message: 'User data retrieved successfully', data: userData, success: true });
    } catch (error) {
        console.error('Error retrieving user data:', error);
        res.status(500).json({ message: `Error retrieving user data: ${error.message}`, success: false });
    }
}