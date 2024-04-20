var jwt = require('jsonwebtoken');
const User = require("../models/userSchema");
const { compareSync } = require('bcrypt');

const verifyTokenAuthLogin = async (req, res, next) => {
    const cookieHeader = req.headers?.cookie;
    const cookie = cookieHeader.split(';').reduce((cookies, cookie) => {
        const [name, value] = cookie.trim().split('=');
        cookies[name] = value;
        return cookies;
    }, {});
    const token = cookie.token;
    // const token = req.cookies?token;
    // console.log("token: ",token);
    if (!token) {
        return res.status(401).json({ message: "Token not found" });
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findOne({ userName: decodedToken.userName });
        if (user) {
            req.user = user;
            if (req.path !== "/") {
                next();
            } else
                return res.json({ user: user.userName })
        } else {
            return res.status(401).json({ message: "Invalid Token" });
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

module.exports = { verifyTokenAuthLogin }