const mongoose = require('mongoose');

const CoinSheetSchema = new mongoose.Schema({
    initialCoins: {
        type: Number,
        required: true
    },
    spend: {
        type: Number,
        required: true,
    },
    remaining: {
        type: Number,
    }
},
    {
        timestamps: true
    }
);

CoinSheetSchema.pre('save', function (next) {
    this.remaining = this.initialCoins - this.spend;
    next();
});

const CoinSheet = mongoose.model('CoinSheet', CoinSheetSchema);

module.exports = CoinSheet;