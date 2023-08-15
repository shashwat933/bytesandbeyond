
const User = require('../model/userModel');
const bcrypt = require('bcryptjs');


exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).send({
            success: true,
            userCount: users.length,
            success: true,
            message: "Details of all users",
            users
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Error in fetching users",
            success: false,
            error
        })
    }
}

exports.registerController = async (req, res) => {
    try {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const blogs = req.body.blogs;

        if (!username || !email || !password) {
            return res.status(400).send({
                success: false,
                message: "Please enter all details"
            })

        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(401).send({
                success: false,
                message: "User already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User({ username, email, password: hashedPassword, blogs });
        await user.save();
        return res.status(201).send({
            success: true,
            message: "User created",
            user
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Error in Registering the user",
            success: false,
            error
        })
    }
}

exports.getUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        return res.status(200).send({
            success: true,


            message: "Details of users",
            user
        })
    } catch (error) {
        console.log(error);
    }
}

exports.loginController = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        if (!email || !password) {
            return res.status(401).send({
                success: false,
                message: 'Please provide email or password'
            })
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(200).send({
                success: false,
                message: 'Please register first'
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: 'Invalid username or password'
            })
        }

        return res.status(200).send({
            success: true,
            message: 'login successfully',
            user
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Error in Logging",
            success: false,
            error
        })
    }

}


