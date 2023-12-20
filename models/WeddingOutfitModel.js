const mongoose = require('mongoose');
const WOSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        description: {
            type: String,
            require: true,
        },
        size: {
            type: String,
            require: true,
        },
        price: {
            type: Number,
            require: true,
        },
        color:{
            type: String,
            require: true,
        },
        status:{
            type: String,
            require: true,
            default: "Sẵn sàng"
        },
        image: {
            type: String,
            require: true,
        },
        cloudinary_id: {
            type: String,
            require: true,
        },
    },
    {
        timestamps: true,
    },
);
const service = mongoose.model('weddingOutfit', WOSchema);

module.exports = service;
