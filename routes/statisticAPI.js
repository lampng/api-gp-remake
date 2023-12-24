require('colors');
// mongodb user model
const userModels = require('../models/userModel');
const clientModels = require('../models/clientModel');
const serviceModels = require('../models/ServiceModel');
const contractModels = require('../models/contractModel');
const WOModels = require('../models/WeddingOutfitModel');
const moment = require('moment');

require('dotenv').config();
var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.json({
        status: 'Đang phát triển',
        'Thống kê dịch vụ sử dụng nhiều nhất (GET)':
            'https://api-gp-remake-production.up.railway.app/statistic/popular-services',
    });
});
router.get('/totalRevenue', async (req, res) => {
    try {
        let query = { status: 'Đã thanh toán' };

        // Thêm điều kiện tìm kiếm theo tháng năm nếu được cung cấp
        if (req.query.month && req.query.year) {
            const startOfMonth = new Date(`${req.query.year}-${req.query.month}-01`);
            const endOfMonth = new Date(`${req.query.year}-${req.query.month + 1}-01`);
            query = {
                ...query,
                signingDate: { $gte: startOfMonth, $lt: endOfMonth },
            };
        }
        query = {
            ...query,
            signingDate: { $exists: true, $ne: null },
        };

        // Truy vấn các hợp đồng theo điều kiện
        const contracts = await contractModels.find(query);

        // Tính tổng số tiền từ các hợp đồng
        const totalAmount = contracts.reduce((acc, contract) => acc + contract.priceTotal, 0);

        res.json({ totalAmount });
    } catch (error) {
        console.error('Lỗi khi lấy tổng số tiền:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi' });
    }
});
module.exports = router;
