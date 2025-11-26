// config/cloudinary.js
const cloudinary = require("cloudinary").v2;

// Make sure to load environment variables first
require('dotenv').config(); // ✅ ADD THIS LINE

console.log('🔍 Cloudinary Config Check:');
console.log('Cloud Name:', process.env.CLOUD_NAME);
console.log('API Key:', process.env.CLOUD_API_KEY ? '✅ Present' : '❌ Missing');
console.log('API Secret:', process.env.CLOUD_API_SECRET ? '✅ Present' : '❌ Missing');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,      // ✅ Match your .env exactly
    api_key: process.env.CLOUD_API_KEY,      // ✅ Match your .env exactly
    api_secret: process.env.CLOUD_API_SECRET,// ✅ Match your .env exactly
    secure: true
});

// ✅ Test the configuration
console.log('✅ Cloudinary configured successfully');

module.exports = cloudinary;