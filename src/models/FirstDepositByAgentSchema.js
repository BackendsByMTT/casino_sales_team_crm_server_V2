const mongoose = require('mongoose');

const FirstDepositSchema = new mongoose.Schema({
    cashIn: {
        type: Number,
        required: true
    },
    cashOut: {
        type: Number,
        required: true,
    },
    net: {
        type: Number,
        required: true
    },

});

const FirstDeposit = mongoose.model('FirstDeposit', FirstDepositSchema);

module.exports = FirstDeposit;