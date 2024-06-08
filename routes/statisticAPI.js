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
        'Thống kê doanh thu (GET)':
            'http://localhost:1102/statistic/totalRevenue',
        'Thống kê dịch vụ sử dụng nhiều nhất (GET)':
            'http://localhost:1102/statistic/service-usage',
        'Thống kê áo cưới sử dụng nhiều nhất (GET)':
            'http://localhost:1102/statistic/wedding-outfit-usage',
    });
});
router.get('/totalRevenue', async (req, res) => {
    try {
        // let query = { status: 'Đã thanh toán' };
        
        // // Thêm điều kiện tìm kiếm theo tháng năm nếu được cung cấp
        // if (req.query.month && req.query.year) {
        //     const startOfMonth = new Date(`${req.query.year}-${req.query.month}-01`);
        //     const endOfMonth = new Date(`${req.query.year}-${req.query.month + 1}-01`);
        //     query = {
        //         ...query,
        //         signingDate: { $gte: startOfMonth, $lt: endOfMonth },
        //     };
        // }
        // query = {
        //     ...query,
        //     signingDate: { $exists: true, $ne: null },
        // };

        // // Truy vấn các hợp đồng theo điều kiện
        // const contracts = await contractModels.find(query);

        // // Tính tổng số tiền từ các hợp đồng
        // const totalAmount = contracts.reduce((acc, contract) => acc + contract.priceTotal, 0);
        const revenue = await calculateRevenue(req.query.month, req.query.year);
        res.json({ revenue });
    } catch (error) {
        console.error('Lỗi khi lấy tổng số tiền:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi' });
    }
});
router.get('/service-usage', async (req, res) => {
    try {
        const result = await contractModels.aggregate([
            {
                $unwind: '$services',
            },
            {
                $group: {
                    _id: '$services.serviceId',
                    count: { $sum: 1 },
                },
            },
            {
                $sort: { count: -1 },
            },
            {
                $limit: 10,
            },
        ]);
        // chúng ta cần tìm trong collection ServiceModels để lấy chi tiết.
        const servicesDetails = await serviceModels
            .find({
                _id: {
                    $in: result.map((service) => service._id),
                },
            })
            .lean();

        const servicesWithCount = result.map((service) => {
            const serviceDetail = servicesDetails.find((detail) => detail._id.equals(service._id));
            return {
                ...serviceDetail,
                count: service.count,
            };
        });
        res.json(servicesWithCount);
    } catch (error) {
        console.error('Lỗi khi lấy thông tin sử dụng dịch vụ:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.get('/wedding-outfit-usage', async (req, res) => {
    try {
        const result = await contractModels.aggregate([
            {
                $unwind: '$weddingOutfit',
            },
            {
                $group: {
                    _id: '$weddingOutfit.weddingOutfitId',
                    count: { $sum: 1 },
                },
            },
            {
                $sort: { count: -1 },
            },
            {
                $limit: 10,
            },
        ]);

        const WOsDetails = await WOModels.find({
            _id: {
                $in: result.map((WO) => WO._id),
            },
        }).lean();

        const WOsWithCount = result.map((WO) => {
            const WODetail = WOsDetails.find((detail) => detail._id.equals(WO._id));
            return {
                ...WODetail,
                count: WO.count,
            };
        });
        res.json(WOsWithCount);
    } catch (error) {
        console.error('Lỗi khi lấy thông tin sử dụng áo cưới:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

async function calculateRevenue(month, year) {
    let matchCriteria = {
        status: 'Đã thanh toán',
    };

    if (month && year) {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0, 23, 59, 59, 999);

        matchCriteria.workDate = {
            $gte: startDate,
            $lte: endDate,
        };
    } else if (year) {
        const startDate = new Date(year, 0, 1);
        const endDate = new Date(year, 11, 31, 23, 59, 59, 999);

        matchCriteria.workDate = {
            $gte: startDate,
            $lte: endDate,
        };
    }

    const result = await contractModels.aggregate([
        {
            $match: matchCriteria,
        },
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: '$priceTotal' },
            },
        },
    ]);

    return result.length > 0 ? result[0].totalRevenue : 0;
}
module.exports = router;
