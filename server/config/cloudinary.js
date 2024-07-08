import { v2 as cloudinary } from 'cloudinary'
export const configCloudinary=()=>{
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
    });
}


export const handleUpload = async (file) => {
    console.log("handle upload")
    const res = await cloudinary.uploader.upload(file,
        { folder: "TOMS" });
    return res;
}
export const handleDelete=async (file)=>{
    const res= await cloudinary.uploader.destroy(file)
    return res;
}
