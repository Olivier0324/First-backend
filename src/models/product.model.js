// models/product.model.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    images: [{
        url: {
            type: String,
            required: true,
        },
        image_id: {
            type: String,
            required: true,
        },
    }]
}, {
    timestamps: true // ✅ Add timestamps automatically
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;