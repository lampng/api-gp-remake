const mongoose = require('mongoose');
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
        discountCodeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'discountCode',
        },
        serviceIds: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'service',
            },
        ],
        weddingOutfitIds: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'weddingOutfit',
            },
        ],
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
        additionalCosts: [
            {
                description: { type: String, required: true },
                amount: { type: Number, required: true, min: 0 },
            },
        ],
        status: {
            type: String,
            default: 'Chưa thanh toán',
        },
        active:{
            type: Boolean,
        }
    },
    {
        timestamps: true,
    },
);

const contract = mongoose.model('contract', contractSchema);

module.exports = contract;
