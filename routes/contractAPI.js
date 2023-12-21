require('colors');
// mongodb user model
const userModels = require('../models/userModel');
const clientModels = require('../models/clientModel');
const contractModels = require('../models/contractModel');
const ServiceModel = require('../models/ServiceModel');
const WeddingOutfitModels = require('../models/WeddingOutfitModel');
const discountModel = require('../models/discountModel');
require('dotenv').config();
//Tải lên ảnh
const cloudinary = require('../middleware/cloudinary.js');
var express = require('express');
var router = express.Router();
const moment = require('moment');

router.get('/', (req, res) => {
    res.json({
        status: 'Đang phát triển',
        check,
    });
});
router.post('/create', async (req, res) => {
    try {
        // Kiểm tra các tham số rỗng
        const checkField = (field) => !field;
        const requiredFields = [
            'userId',
            'clientId',
            'serviceIds',
            'weddingOutfitIds',
            'note',
            'workDate',
            'deliveryDate',
            'location',
        ];
        const missingFields = requiredFields.filter((field) => checkField(req.body[field]));

        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Vui lòng điền đầy đủ thông tin các trường còn thiếu ${missingFields.join(', ')}`,
            });
        }
        const user = await userModels.findById(req.body.userId);
        if (user.role == 'Quản lý') {
            var active = true;
        } else {
            var active = false;
        }
        const contract = await contractModels.create({
            userId: req.body.userId,
            clientId: req.body.clientId,
            serviceIds: req.body.serviceIds,
            weddingOutfitIds: req.body.weddingOutfitIds,
            note: req.body.note,
            workDate: moment(req.body.workDate, 'HH:mm DD/MM/YYYY').format('HH:mm DD/MM/YYYY'),
            deliveryDate: moment(req.body.deliveryDate, 'DD/MM/YYYY').format('DD/MM/YYYY'),
            location: req.body.location,
            active: active,
        });
        contract.save();
        res.status(201).json({ success: true, message: 'Tạo hợp đồng thành công' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
router.get('/list', async (req, res) => {
    try {
        const data = await contractModels.find({});
        data.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
        res.status(200).json(data);
        console.log(`✅ Gọi danh sách hợp đồng thành công`.green.bold);
    } catch (error) {
        console.log(`❗  ${error.message}`.bgRed.white.strikethrough.bold);
        res.status(500).json({
            message: error.message,
        });
    }
});
module.exports = router;
