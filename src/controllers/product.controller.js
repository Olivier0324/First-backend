// controllers/product.controller.js
const Product = require('../models/product.model');
// ✅ Correct import path
const { uploadImage, uploadMultipleImages } = require('../utils/cloudinaryFileUploads');

// Function to create products
const createProduct = async (req, res) => {
    try {
        const { name, description, price } = req.body;

        // Check if files were uploaded
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: "At least one image is required" });
        }

        // Upload images to Cloudinary
        const images = await uploadMultipleImages(req.files);

        // Create product
        const product = await Product.create({
            name,
            description,
            price,
            images
        });

        console.log("Product created:", product);
        res.status(201).json({
            message: "Product created successfully",
            product: product
        });
    } catch (err) {
        console.log("Create product error:", err);
        res.status(500).json({ error: err.message });
    }
}

// Function to get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Function to get product by id
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Function to update product
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        const { name, description, price } = req.body;

        // Update basic fields
        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;

        // If new images are uploaded, update them
        if (req.files && req.files.length > 0) {
            const newImages = await uploadMultipleImages(req.files);
            product.images = [...product.images, ...newImages]; // Add new images to existing ones
        }

        await product.save();
        res.status(200).json({
            message: "Product updated successfully",
            product: product
        });
    } catch (err) {
        console.log("Update product error:", err);
        res.status(500).json({ error: err.message });
    }
}

// Exporting functions
module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct
}