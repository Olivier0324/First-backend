// user controller
const User = require('../models/user.model');
//import bcrypt
const {generateToken} = require('../utils/utils');
const bcrypt = require('bcryptjs');
const createUser = async (req, res) => {
    try {

        const { username, password, email } = req.body;

        if (!username || !password || !email) {
            return res.status(400).send({ message: 'Please provide all the details' });
        }

        console.log("🔍 Checking if user exists...");
        const userExist = await User.findOne({ email: email.toLowerCase() });

        if (userExist) {
            return res.status(409).send({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password: hashedPassword
        });
        res.status(201).send({
            message: 'User created successfully',
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (e) {
        res.status(500).send({ message: "Internal server error: " + e.message });
    }
}
//login function for the user with jwt
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({ message: 'Please provide all the details' });
        }

        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res.status(401).send({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).send({ message: 'Invalid email or password' });
        }

        const token = generateToken(user._id);

        res.status(200).send({
            message: 'User logged in successfully',
            token: token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }   
        })
    }
    catch (e) {
        res.status(500).send({ message: "Internal server error: " + e.message });
    }
}
//admin login   
const adminLogin = (req, res) => {
    const { email, password } = req.body;
    
}
//getting all users from the database
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (e) {
        res.status(500).send({ message: "Internal server error: " + e.message });
    }
}


//export createUser
module.exports = {
    createUser,
    loginUser,
    getAllUsers
}