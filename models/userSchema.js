const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    activeStatus: {
        type: Boolean,
        default: true
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    lastLogout: {
        type: Date,
        default: null
    }
},
    {
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;