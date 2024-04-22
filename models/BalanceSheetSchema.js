const mongoose = require('mongoose');

const BalanceSheetSchema = new mongoose.Schema({
    employeeName: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    incentive: {
        type: Number,
        required: true,
    },
    totalSalary: {
        type: Number,
    },
    review: {
        type: String,
        required: true,
    }
},
    {
        timestamps: true
    }
);

BalanceSheetSchema.pre('save', function (next) {
    this.totalSalary = this.salary + this.incentive;
    next();
});

const BalanceSheet = mongoose.model('BalanceSheet', BalanceSheetSchema);

module.exports = BalanceSheet;