require('colors');
// mongodb user model
const userModels = require('../models/userModel');
const clientModels = require('../models/clientModel');
const contractModels = require('../models/contractModel');
const ServiceModels = require('../models/ServiceModel');
const WeddingOutfitModels = require('../models/WeddingOutfitModel');
require('dotenv').config();
//Tải lên ảnh
const cloudinary = require('../middleware/cloudinary.js');
var express = require('express');
var router = express.Router();
const moment = require('moment');

router.get('/', (req, res) => {
    res.json({
        status: 'Đang phát triển',
        'Tạo hợp đồng(POST):': `https://api-gp-remake-production.up.railway.app/contract/create/`,
        'Gọi danh sách(GET):': `https://api-gp-remake-production.up.railway.app/contract/list/`,
        'Gọi danh sách theo userId(GET):': `https://api-gp-remake-production.up.railway.app/contract/list/:id`,
        'Chi tiết hợp đồng(GET):': `https://api-gp-remake-production.up.railway.app/contract/detail/:id`,
        'Sửa hợp đồng(PUT):': `https://api-gp-remake-production.up.railway.app/contract/update/:id`,
        'Xoá hợp đồng(DELETE):': `https://api-gp-remake-production.up.railway.app/contract/delete/:id`,
    });
});
//  TODO: Tạo hợp đồng
router.post('/create', async (req, res) => {
    try {
        // Kiểm tra các tham số rỗng
        const checkField = (field) => !field;
        const requiredFields = ['userId', 'clientId', 'services', 'workDate', 'deliveryDate', 'location'];
        const missingFields = requiredFields.filter((field) => checkField(req.body[field]));

        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Vui lòng điền đầy đủ thông tin các trường còn thiếu ${missingFields.join(', ')}`,
            });
        }

        const user = await userModels.findById(req.body.userId);
        const active = user.role === 'Quản lý';

        const contract = await contractModels.create({
            userId: req.body.userId,
            clientId: req.body.clientId,
            services: req.body.services,
            weddingOutfit: req.body.weddingOutfit.map((outfit) => ({
                ...outfit,
                rentalDate: moment(outfit.rentalDate, 'DD/MM/YYYY'),
                returnDate: moment(outfit.returnDate, 'DD/MM/YYYY'),
            })),
            note: req.body.note,
            workDate: moment(req.body.workDate, 'HH:mm DD/MM/YYYY').format('HH:mm DD/MM/YYYY'),
            deliveryDate: moment(req.body.deliveryDate, 'DD/MM/YYYY').format('DD/MM/YYYY'),
            location: req.body.location,
            prepayment: req.body.prepayment,
            additionalCosts: req.body.additionalCosts,
            discount: req.body.discount,
            priceTotal: req.body.priceTotal,
            active: active,
        });

        // Gọi save() một lần
        await contract.save();

        res.status(201).json({ success: true, message: 'Tạo hợp đồng thành công' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// TODO: Gọi danh sách
router.get('/list', async (req, res) => {
    try {
        const priority = {
            'Chưa thanh toán': 1,
            'Đã thanh toán': 2,
            Huỷ: 3,
        };
        const data = await contractModels
            .find({
                status: {
                    $in: ['Chưa thanh toán', 'Đã thanh toán'],
                },
            })
            .populate({
                path: 'userId',
                model: 'user',
                select: 'name role job phone',
            })
            .populate({
                path: 'clientId',
                model: 'client',
                select: 'name address phone phone2 gender',
            })
            .populate({
                path: 'services.serviceId',
                model: 'service',
                select: 'name description price image',
            })
            .populate({
                path: 'weddingOutfit.weddingOutfitId',
                model: 'weddingOutfit',
                select: 'name description price image',
            })
            .exec();

        const sort = data.map((data) => {
            return {
                ...data._doc,
                Priority: priority[data.status] || 0,
            };
        });

        sort.sort((a, b) => {
            return a.Priority - b.Priority || new Date(b.createdAt) - new Date(a.createdAt);
        });
        console.log(`✅ Gọi danh sách hợp đồng thành công`.green.bold);
        res.status(200).json(sort);
    } catch (error) {
        console.log(`❗  ${error.message}`.bgRed.white.strikethrough.bold);
        res.status(500).json({
            message: error.message,
        });
    }
});
// TODO: Gọi danh sách theo userId
router.get('/list/:id', async (req, res) => {
    try {
        const priority = {
            'Chưa thanh toán': 1,
            'Đã thanh toán': 2,
            Huỷ: 3,
        };
        const data = await contractModels
            .find(
                {
                    status: {
                        $in: ['Chưa thanh toán', 'Đã thanh toán'],
                    },
                },
                { userId: req.params.id },
            )
            .populate({
                path: 'clientId',
                model: 'client',
                select: 'name address phone phone2 gender',
            })
            .populate({
                path: 'services.serviceId',
                model: 'service',
                select: 'name description price image',
            })
            .populate({
                path: 'weddingOutfit.weddingOutfitId',
                model: 'weddingOutfit',
                select: 'name description price image',
            })
            .exec();

        const sort = data.map((data) => {
            return {
                ...data._doc,
                Priority: priority[data.status] || 0,
            };
        });

        sort.sort((a, b) => {
            return a.Priority - b.Priority || new Date(b.createdAt) - new Date(a.createdAt);
        });
        console.log(`✅ Gọi danh sách hợp đồng thành công`.green.bold);
        res.status(200).json(sort);
    } catch (error) {
        console.log(`❗  ${error.message}`.bgRed.white.strikethrough.bold);
        res.status(500).json({
            message: error.message,
        });
    }
});
// TODO: Gọi chi tiết
router.get('/detail/:id', async (req, res) => {
    try {
        const data = await contractModels
            .findById(req.params.id)
            .populate({
                path: 'clientId',
                model: 'client',
                select: 'name address phone phone2 gender',
            })
            .populate({
                path: 'services.serviceId',
                model: 'service',
                select: 'name description price image',
            })
            .populate({
                path: 'weddingOutfit.weddingOutfitId',
                model: 'weddingOutfit',
                select: 'name description price image',
            })
            .exec();
        console.log(`✅ Gọi chi tiết hợp đồng thành công`.green.bold);
        res.status(200).json(data);
    } catch (error) {
        console.log(`❗  ${error.message}`.bgRed.white.strikethrough.bold);
        res.status(500).json({
            message: error.message,
        });
    }
});
// TODO: sửa hợp đồng
router.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const options = { new: true };
        const updatedContract = await contractModels.findByIdAndUpdate(id, updates, options);

        if (!updatedContract) {
            return res.status(404).json({
                success: false,
                message: `Không tìm thấy hợp đồng`,
            });
        }

        console.log(`✅ Sửa hợp đồng thành công`.green.bold);

        res.status(200).json({
            success: true,
            message: `Sửa hợp đồng [${id}] thành công`,
        });
    } catch (error) {
        console.error(`❗ ${error.message}`);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
// TODO: Xóa hợp đồng
router.delete('/delete/:id', async (req, res) => {
    try {
        const contract = await contractModels.findByIdAndDelete(req.params.id);

        console.log(`✅ Xoá thành công`);
        res.status(200).json({
            message: 'Hợp đồng đã được xóa thành công',
            contract: contract.id,
        });
    } catch (error) {
        console.error(`❗ Không tìm thấy hợp đồng`);
        res.status(500).json({
            message: 'Không tìm thấy hợp đồng hoặc có lỗi xảy ra',
        });
    }
});
module.exports = router;

const isValidDate = (dateString, format) => moment(dateString, format, true).isValid();
const parseDate = (dateString, format) => {
    if (isValidDate(dateString, format)) {
        return moment(dateString, format).format(format);
    }
    // Xử lý lỗi hoặc trả về giá trị mặc định nếu ngày không hợp lệ.
    return null;
};
