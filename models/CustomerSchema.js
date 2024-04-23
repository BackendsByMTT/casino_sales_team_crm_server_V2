const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true
    },
    gameName: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    accountName: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    remarks: {
        type: String,
        required: true,
    }
},
    {
        timestamps: true
    }
);

const Customer = mongoose.model('Customer', CustomerSchema);

module.exports = Customer;