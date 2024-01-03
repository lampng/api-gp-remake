const mongoose = require('mongoose');
const moment = require('moment');

const workTypeSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);
const workType = mongoose.model('worktype', workTypeSchema);

const workSchema = mongoose.Schema(
    {
        workType_ID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'worktype',
            required: true,
        },
        user_ID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
        workDate: {
            type: Date,
            required: true,
        },
        imageContract: {
            type: String,
            require: false,
        },
        cloudinary_id: {
            type: String,
            require: false,
        },
        address: {
            type: String,
            required: true,
        },
        note: {
            type: String,
        },
        status: {
            type: String,
            required: true,
            default: 'Chưa hoàn thành', // * "Đã hoàn thành", "Không hoàn thành"
        },
    },
    {
        timestamps: true,
    },
);

const work = mongoose.model('work', workSchema);

module.exports = { work, workType };
