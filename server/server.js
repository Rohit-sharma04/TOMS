import express from "express"
import colors from "colors"
import dotenv from 'dotenv'
import userRoute from "./routes/user.route.js"
import officerRoute from "./routes/officer.route.js"
import adminRoute from "./routes/admin.route.js"
import authRoute from "./routes/auth.route.js"
import paymentRoute from './routes/payment.route.js'
import cors from 'cors'
import connectDB from "./config/db.js"
import cookieParser from "cookie-parser"
import { configCloudinary } from "./config/cloudinary.js"
import multer from "multer"
import { handleStripeWebhookEvent } from "./controller/payment.controller.js"

//dotenv conig 
dotenv.config()

//cloudinary config
configCloudinary()

//mongodb connection
await connectDB();

const app = express();

// Multer is a  middleware for handling multipart/form-data
const upload = multer();

app.use(express.json());
app.use(cookieParser());
// Configure CORS middleware with credentials:true to allow cookies in cross-origin requests
app.use(cors({
    credentials: true,
    origin: [process.env.CLIENT_URL]
}))

app.post('/webhook', express.raw({ type: 'application/json' }), handleStripeWebhookEvent);

app.use("/api/user", upload.any(), userRoute);
app.use("/api/officer", upload.any(), officerRoute);
app.use("/api/admin", upload.any(), adminRoute);
app.use('/api/auth', authRoute);
app.use('/api/stripe', paymentRoute);

//port 
const port = process.env.PORT || 8080;
//listen port
app.listen(port, () => {
    console.log(
        `Server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`
            .bgCyan.white
    );
})