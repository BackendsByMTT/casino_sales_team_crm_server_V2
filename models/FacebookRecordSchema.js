const mongoose = require('mongoose');

const FacebookRecordSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    fbLink: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: true
    },
    agentName: {
        type: String,
        required: true
    },

},
    {
        timestamps: true
    }
);

const FacebookRecord = mongoose.model('FacebookRecord', FacebookRecordSchema);

module.exports = FacebookRecord;