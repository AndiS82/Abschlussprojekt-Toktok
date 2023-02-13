import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    secure: true
});

export const deleteImage = async (publicId) => {
    const cloudinaryResult = await cloudinary.uploader.destroy(publicId)
    console.log(cloudinaryResult)
    return cloudinaryResult
}