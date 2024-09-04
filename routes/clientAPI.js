require('colors');
// mongodb user model
const userModels = require('../models/userModel');
const clientModels = require('../models/clientModel');
require('dotenv').config();
//Tải lên ảnh
const cloudinary = require('../middleware/cloudinary.js');
var express = require('express');
var router = express.Router();
const moment = require('moment');

router.get('/', (req, res) => {
    res.json({
        status: 'Đang phát triển',
        'Tạo khách hàng mới(POST):': `http://api-gp-remake.onrender.com/client/create`,
        'Gọi danh sách khách hàng(GET):': `http://api-gp-remake.onrender.com/client/list`,
        'Gọi chi tiết khách hàng(GET):': `http://api-gp-remake.onrender.com/client/detail/:id`,
        'Cập nhập thông tin khách hàng(PUT):': `http://api-gp-remake.onrender.com/client/update/:id`,
        'Xoá khách hàng(DELETE):': `http://api-gp-remake.onrender.com/client/delete/:id`,
    });
});

// TODO: Gọi danh sách khách hàng
router.get('/list', async (req, res) => {
    try {
        const clients = await clientModels.find({});

        // TODO: Sắp xếp giảm dần
        clients.sort((a, b) => b.createdAt - a.createdAt);
        clients.sort((a, b) => (a.disable === b.disable ? 0 : a.disable ? 1 : -1));

        res.status(200).json(clients);
        console.log(`✅ Gọi danh sách khách hàng thành công`.green.bold);
    } catch (error) {
        console.log(`❗  ${error.message}`.bgRed.white.strikethrough.bold);
        res.status(500).json({
            message: error.message,
        });
    }
});
// TODO: Gọi chi tiết khách hàng ([:id] = id của khách hàng)
router.get('/detail/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const client = await clientModels.findById(id);
        res.status(200).json(client);
        console.log(`✅ Gọi chi tiết người dùng thành công`.green.bold);
    } catch (error) {
        console.log(`❗  ${error.message}`.bgRed.white.strikethrough.bold);
        res.status(500).json({
            message: error.message,
        });
        console.log(`❗  Gọi chi tiết người dùng thất bại`.bgRed.white.strikethrough.bold);
    }
});
// TODO: Tạo khách hàng mới
router.post('/create', async (req, res) => {
    try {
        const checkField = (field) => !field;

        const requiredFields = ['name', 'address', 'gender', 'phone'];
        const missingFields = requiredFields.filter((field) => checkField(req.body[field]));

        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Vui lòng điền đầy đủ thông tin các trường còn thiếu ${missingFields.join(', ')}`,
            });
        }
        await userModels
            .findOne({
                phone: req.body.phone,
            })
            .then((data) => {
                if (data) {
                    return res.status(500).json({
                        Error: 'Số điện đã tồn tại',
                    });
                } else {
                    const newClient = new clientModels({
                        name: req.body.name,
                        address: req.body.address,
                        phone: req.body.phone,
                        phone2: req.body.phone2,
                    });
                    try {
                        newClient.save();
                        console.log(`✅ Tạo khách hàng thành công`.green.bold);
                        res.status(200).json({
                            success: true,
                            message: 'Tạo khách hàng thành công',
                        });
                    } catch (error) {
                        console.log(`❗  ${error}`.bgRed.white.strikethrough.bold);
                        res.status(500).json({
                            success: false,
                            message: error,
                        });
                    }
                }
            });
    } catch (error) {
        console.log(`❗  ${error}`.bgRed.white.strikethrough.bold);
        res.status(500).json({
            success: false,
            message: error,
        });
    }
});
// TODO: Cập nhập thông tin khách hàng
router.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const client = await clientModels.findById(id);

        if (!client) {
            return res.status(404).json({
                success: false,
                message: `Không tìm thấy khách hàng`,
            });
        }

        const data = {
            ...req.body,
        };
        const update = await clientModels.findByIdAndUpdate(id, data, { new: true });
        if (update) {
            console.log(`✅ Sửa khách hàng thành công`.green.bold);
            res.status(200).json({
                success: true,
                message: `Sửa khách hàng [${client.name}] thành công`,
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
        console.log(`❗  Cập nhật khách hàng thất bại`.bgRed.white.strikethrough.bold);
    }
});
// TODO: ✅ Xoá khách hàng ([:id] = id của khách hàng)
router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const client = await clientModels.findByIdAndDelete(id);
        if (!client) {
            return res.status(404).json({
                success: false,
                message: `Không tìm thấy khách hàng`,
            });
        }
        console.log(`✅ Xoá thành công`);
        res.status(200).json({
            success: true,
            message: `Xoá khách hàng [${client.name}] thành công`,
        });
    } catch (error) {
        console.error(`❗ ${error.message}`);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
module.exports = router;
