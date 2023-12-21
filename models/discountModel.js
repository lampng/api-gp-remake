const mongoose = require('mongoose');
const DiscountCodeSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    percentageDiscount: {
        type: Number,
        required: true,
        min: 1,
        max: 100,
    }, 
    validFrom: {
        type: Date,
        required: true,
    },
    validUntil: {
        type: Date,
        required: true,
    },
    
});

const DiscountCode = mongoose.model('discountCode', DiscountCodeSchema);
module.exports = DiscountCode;

