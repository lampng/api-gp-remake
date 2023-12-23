const mongoose = require('mongoose');
const clientSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: false,
        },
        address: {
            type: String,
            require: false,
        },
        phone: {
            type: String,
            require: false,
        },
        phone2: {
            type: String,
            require: false,
        },
        gender: {
            type: String,
            require: false,
        },
    },
    {
        timestamps: true,
    },
);

const client = mongoose.model('client', clientSchema);

module.exports = client;
