//creating user model here
const mongoose = require('mongoose');
// import bcryptjs

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowecase: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    
}, {
    timestamps: true
})

//exporting user model
const User= mongoose.model('User', userSchema);
module.exports = User;