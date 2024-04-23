const mongoose = require('mongoose');

const AgentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    agentName: {
        type: String,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    gameName: {
        type: String,
        required: true
    },
    amountOfCoins: {
        type: Number,
        required: true,
    },
    accountName: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
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

const Agent = mongoose.model('Agent', AgentSchema);

module.exports = Agent;