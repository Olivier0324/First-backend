// utils/cloudinary.js
const cloudinary = require('../config/cloudinary');

// Function to upload image to cloudinary from memory buffer
const uploadImage = async (file) => {
    try {
        // Convert buffer to data URI for Cloudinary
        const dataUri = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;

        const result = await cloudinary.uploader.upload(dataUri, {
            folder: 'products',
        });

        return {
            url: result.secure_url,
            image_id: result.public_id
        };
    } catch (error) {
        console.log("Single image upload error:", error);
        throw error;
    }
}

// Function to upload multiple images to cloudinary from memory buffers
const uploadMultipleImages = async (files) => {
    try {
        const uploadPromises = files.map(file => {
            // Convert each file buffer to data URI
            const dataUri = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;

            return cloudinary.uploader.upload(dataUri, {
                folder: 'products',
            });
        });

        const results = await Promise.all(uploadPromises);

        return results.map((file) => {
            return {
                url: file.secure_url,
                image_id: file.public_id,
            };
        });
    } catch (error) {
        console.log("Multiple images upload error:", error);
        throw error;
    }
}

const deleteImage = async (public_id) => {
    try {
        await cloudinary.uploader.destroy(public_id);
    } catch (error) {
        console.log("Delete image error:", error);
        throw error;
    }
}

module.exports = { uploadImage, uploadMultipleImages, deleteImage };