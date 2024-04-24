const mongoose = require('mongoose');

const FreshMessageSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    agentName: {
        type: String,
        required: true
    },
    systemNumber: {
        type: Number,
        required: true,
    },
    accountName: {
        type: String,
        required: true,
    },
    playerId: {
        type: String,
        required: true,
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

const FreshMessage = mongoose.model('FreshMessage', FreshMessageSchema);

module.exports = FreshMessage;