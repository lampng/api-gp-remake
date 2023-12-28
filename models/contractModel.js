const mongoose = require('mongoose');
const contractServices = mongoose.Schema({
    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'service',
    },
});
const contractWeddingOutfits = mongoose.Schema({
    weddingOutfitId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'weddingOutfit',
    },
    rentalDate: {
        type: String,
    },
    returnDate: {
        type: String,
    },
    description: {
        type: String,
    },
});
const additionalCost = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
});
const contractSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
        clientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'client',
        },
        services: [contractServices],
        weddingOutfit: [contractWeddingOutfits],
        note: {
            type: String,
        },
        workDate: {
            type: Date,
        },
        deliveryDate: {
            type: Date,
        },
        location: {
            type: String,
        },
        prepayment: {
            type: Number,
            min: 0,
        },
        additionalCosts: [additionalCost],
        discount: {
            type: Number,
            min: 0,
        },
        priceTotal: {
            type: Number,
            min: 0,
        },
        status: {
            type: String,
            default: 'Chưa thanh toán',
        },
        signingDate: {
            type: Date,
            default: Date.now,
        },
        active: {
            type: Boolean,
        },
    },
    {
        timestamps: true,
    },
);

const contract = mongoose.model('contract', contractSchema);

module.exports = contract;
