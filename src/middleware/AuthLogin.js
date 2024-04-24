var jwt = require('jsonwebtoken');
const User = require("../models/userSchema");

const verifyTokenAuthLogin = async (req, res, next) => {
    try {
        const token = req.headers?.authorization?.split(" ")[1]
        console.log(token);
        if (!token) {
            return res.status(401).json({ status: false, message: "Authorization token is missing." });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findOne({ userName: decodedToken.userName });
        if (user) {
            next();
        } else {
            return res.status(401).json({ status: false, message: "Invalid Token" });
        }
    } catch (err) {
        return res.status(500).json({ status: false, error: err.message });
    }
};

const verifyDesgination = async (req, res, next) => {
    try {
        const token = req.headers?.authorization?.split(" ")[1]
        console.log(token);
        if (!token) {
            return res.status(401).json({ status: false, message: "Authorization token is missing." });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findOne({ userName: decodedToken.userName });
        if (user) {
            req.desg = user.designation;
            console.log(user.designation)
            next();
        } else {
            return res.status(401).json({ status: false, message: "Invalid Token" });
        }
    } catch (err) {
        return res.status(500).json({ status: false, error: err.message });
    }
};



module.exports = { verifyTokenAuthLogin, verifyDesgination }