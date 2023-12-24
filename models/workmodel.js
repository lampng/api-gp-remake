const mongoose = require('mongoose');
const workSchema = mongoose.Schema(
    {

    },
    {
        timestamps: true,
    },
);

const work = mongoose.model('work', workSchema);

module.exports = work;
