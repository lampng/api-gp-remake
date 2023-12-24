const mongoose = require('mongoose');

const workTypeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
});
const workType = mongoose.model('worktype', workTypeSchema);

const workSchema = mongoose.Schema(
    {
        workType_ID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'worktype', // Liên kết với collection worktype
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
            default: 'Chưa làm',
        },
    },
    {
        timestamps: true,
    },
);

const work = mongoose.model('work', workSchema);

module.exports = { work, workType };
