require('colors');
// mongodb user model
const userModels = require('../models/userModel');
const clientModels = require('../models/clientModel');
const contractModels = require('../models/contractModel');
const ServiceModels = require('../models/ServiceModel');
const WeddingOutfitModels = require('../models/WeddingOutfitModel');
const workmodels = require('../models/workmodel');
const discountModel = require('../models/discountModel');
require('dotenv').config();
var express = require('express');
var router = express.Router();
const moment = require('moment');

router.get('/', (req, res) => {
    res.json({
        status: 'Đang phát triển',
        'Tạo loại công việc (POST):': `https://api-gp-remake-production.up.railway.app/work/create`,
        'Danh sách loại công việc (GET):': `https://api-gp-remake-production.up.railway.app/work/list`,
        'Sửa loại công việc (PUT):': `https://api-gp-remake-production.up.railway.app/work/update/:id`,
        'Xoá loại công việc (DELETE):': `https://api-gp-remake-production.up.railway.app/work/delete/:id`,
    });
});
// TODO: Thêm loại công việc
router.post('/create', async (req, res) => {
    try {
        const checkField = (field) => !field;

        const requiredFields = ['name'];
        const missingFields = requiredFields.filter((field) => checkField(req.body[field]));

        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Vui lòng điền đầy đủ thông tin các trường còn thiếu ${missingFields.join(', ')}`,
            });
        }

        const data = new workmodels.workType({
            name: req.body.name,
        });
        data.save();
        console.log(`✅ Tạo loại công việc thành công`.green.bold);
        res.status(200).json({
            success: true,
            message: 'Tạo loại công việc thành công',
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `${error.message}`,
        });
    }
});
// TODO: Danh sách loại công việc
router.get('/list', async (req, res) => {
    try {
        const works = await workmodels.workType.find({});
        res.status(200).json(works);
        console.log(`✅ Gọi danh sách loại việc`.green.bold);
    } catch (error) {
        console.log(`❗  ${error.message}`.bgRed.white.strikethrough.bold);
        res.status(500).json({
            message: error.message,
        });
    }
});
// TODO: Sửa loại công việc
router.put('/update/:id', async (req, res) => {
    try {
        const checkField = (field) => !field;

        const requiredFields = ['name'];
        const missingFields = requiredFields.filter((field) => checkField(req.body[field]));

        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Vui lòng điền đầy đủ thông tin các trường còn thiếu ${missingFields.join(', ')}`,
            });
        }

        const { id } = req.params;
        const updates = req.body;
        const options = { new: true };
        const updateWorkType = await workmodels.workType.findByIdAndUpdate(id, updates, options);

        if (!updateWorkType) {
            return res.status(404).json({
                success: false,
                message: `Không tìm thấy loại công việc`,
            });
        }

        console.log(`✅ Sửa loại công việc thành công`.green.bold);

        res.status(200).json({
            success: true,
            message: `Sửa loại công việc [${id}] thành công`,
        });
    } catch (error) {
        console.error(`❗ ${error.message}`);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
// TODO: Xoá loại loại công việc
router.delete('/delete/:id', async (req, res) => {
    try {
        const workType = await workmodels.workType.findByIdAndDelete(req.params.id);

        console.log(`loại công việc [${workType.name}] đã được xóa thành công`);
        res.status(200).json({
            status: true,
            message: `loại công việc [${workType.name}] đã được xóa thành công`,
        });
    } catch (error) {
        console.error(`❗ Không tìm thấy loại công việc`);
        res.status(500).json({
            status: false,
            message: 'Không tìm thấy loại công việc hoặc có lỗi xảy ra',
        });
    }
});
// ! ================================================
// TODO: Thêm công việc cho nhân viên
module.exports = router;
