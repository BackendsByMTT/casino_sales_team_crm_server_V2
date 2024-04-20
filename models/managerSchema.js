const mongoose = require('mongoose');

const managerSchema = new mongoose.Schema({
    employName: {
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

managerSchema.pre('save', function (next) {
    this.totalSalary = this.salary + this.incentive;
    next();
});

const Manager = mongoose.model('Manager', managerSchema);

module.exports = Manager;