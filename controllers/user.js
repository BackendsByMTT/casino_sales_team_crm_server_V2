const User = require("../models/userSchema")
var jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const setCookie = (res, data) => {
    res.cookie('token', data, {
        maxAge: 1000 * 60 * 60 * 24 * 3, // 3 days
        withCredentials: true,
        httpOnly: false,
        secure: true,
        sameSite: 'none',
    });
};

const test = async (req, res) => {
    return res.status(200).json({
        message: "Login successful"
    });
}

const health = async (req, res) => {
    return res.status(200).json({
        message: "server is running"
    });
}

const register = async (req, res) => {
    try {
        const { userName, email, password, designation, activeStatus } = req.body;

        if (await User.findOne({ userName }))
            return res.status(201).json({ status: false, error: "This userName is not avaiable" });

        if (await User.findOne({ email }))
            return res.status(201).json({ status: false, error: "This email already registered" });

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            userName,
            email,
            password: hashPassword,
            designation,
            activeStatus,
        });
        return res.status(200).json({ status: true, message: "Registration successful!", user: user });
    } catch (err) {
        return res.status(500).json({ status: false, error: err });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) { return res.status(201).json({ status: false, error: "You are not registered" }); }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(201).json({ status: false, error: "Wrong credentials" });
        }
        if (!user.activeStatus) {
            return res.status(204).json({ status: false, error: "Inactive user, Can't login" });
        }

        const istOffset = 5.5 * 60 * 60 * 1000;
        const istDate = new Date(Date.now() + istOffset);

        const updatedUserLoginTime = await User.findOneAndUpdate(
            { email },
            { lastLogin: istDate.toISOString() }
        );

        const token = jwt.sign(
            {
                userName: user.userName,
                designation: user.designation,
            },
            process.env.JWT_SECRET_KEY
        );

        setCookie(res, { token: token });

        return res.status(200).json({
            message: "Login successful",
            user: {
                userName: user.userName,
                designation: user.designation,
            },
            status: true,
            token: token

        });

    } catch (err) {
        return res.status(500).json({ status: false, error: err.message });
    }
}

const getUsers = async (req, res) => {
    const designation = req.query.designation;
    try {
        let query = {};
        if (designation) {
            query = { designation };
        }
        const users = await User.find(query);
        return res.status(200).json({ status: true, users });
    } catch (err) {
        return res.status(500).json({ status: false, error: err.message });
    }
}

const getUserDetails = async (req, res) => {
    const { userName } = req.params;

    try {
        const UserDetails = await User.find({ userName });
        if (!UserDetails) {
            return res.status(404).json({ status: false, error: 'User not found' });
        }

        return res.status(200).json({ status: true, user: UserDetails });
    } catch (err) {
        return res.status(500).json({ status: false, error: err.message });
    }
}

const updateUser = async (req, res) => {
    const { userName } = req.params;
    const { email, password, designation, activeStatus } = req.body;

    try {
        const hashPassword = await bcrypt.hash(password, 10);
        const updatedDetails = {
            userName,
            email,
            password: hashPassword,
            designation,
            activeStatus
        }

        const updatedUser = await User.findOneAndUpdate({ userName }, updatedDetails, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ status: false, error: 'User not found' });
        }

        return res.status(200).json({ message: 'User details updated successfully', user: updatedUser, status: true });
    } catch (err) {
        return res.status(500).json({ status: false, error: err.message });
    }
}

const deleteUser = async (req, res) => {
    const { userName } = req.params;

    try {
        const deletedUser = await User.findOneAndDelete({ userName });

        if (!deletedUser) {
            return res.status(404).json({ status: false, error: 'User not found' });
        }

        return res.status(200).json({ status: true, message: 'User deleted successfully', user: deletedUser });
    } catch (err) {
        return res.status(500).json({ status: false, error: err.message });
    }
}


module.exports = { register, login, test, getUsers, getUserDetails, updateUser, deleteUser, health };