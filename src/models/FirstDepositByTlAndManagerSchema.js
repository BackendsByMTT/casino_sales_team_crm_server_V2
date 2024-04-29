const mongoose = require('mongoose');

const FirstDepositByTlAndManagerSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true
    },
    cashIn: {
        type: Number,
        required: true
    },
    cashOut: {
        type: Number,
        required: true,
    },
    net: {
        type: String,
        required: true
    },

});

const FirstDepositByTlAndManager = mongoose.model('FirstDepositByTlAndManager', FirstDepositByTlAndManagerSchema);

module.exports = FirstDepositByTlAndManager;