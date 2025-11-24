// user controller
const User = require('../models/user.model');

const createUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        // validation
        if(!username || !password || !email) {
          return res.status(400).send({message:'Please provide all the details'});
        }

        // if user exists
        const userExist = await User.findOne({ email:email.toLocaleLowerCase() });
        if (userExist) {
            return res.status(409).send({ message: 'User already exists' });
        }
        const user=await User.create({
            username,
            email:email.toLocaleLowerCase(),
            password
        })

        res.status(201).send({
            message: 'User created successfully',
            user:user
        });
    } catch (e) {
        res.status(500).send({e});//error for the server
    }
}

module.exports = {
    createUser
}