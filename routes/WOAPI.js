require('colors');
// * Model
const WOModel = require('../models/WeddingOutfitModel');
// * Middleware
// * ------------------
require('dotenv').config();
// * Tải lên ảnh
const cloudinary = require('../middleware/cloudinary.js');
const upload = require('../middleware/upload');
var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.json({
        status: 'Đang phát triển',
        'Thêm (POST)': `https://api-gp-remake-production.up.railway.app/WeddingOutfit/create/`,
        'Danh sách (GET)': `https://api-gp-remake-production.up.railway.app/WeddingOutfit/list/`,
        'Chi tiết (GET)': `https://api-gp-remake-production.up.railway.app/WeddingOutfit/detail/:id`,
        'Sửa (PUT)': `https://api-gp-remake-production.up.railway.app/WeddingOutfit/update/:id`,
        'Xoá (DELETE)': `https://api-gp-remake-production.up.railway.app/WeddingOutfit/delete/:id`,
    });
});
// TODO: Thêm áo cưới
router.post('/create', upload.single('image'), async (req, res) => {
    try {
        const checkField = (field) => !field;

        const requiredFields = ['name', 'size', 'price', 'color'];
        const missingFields = requiredFields.filter((field) => checkField(req.body[field]));
        
        if (req.file == null || missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Vui lòng điền đầy đủ thông tin các trường còn thiếu ${missingFields.join(', ')}`,
            });
        }
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'api-graduation-project/wedding-outfit',
        });
        const data = new WOModel({
            name: req.body.name,
            description: req.body.description,
            size: req.body.size,
            price: req.body.price,
            color: req.body.color,
            image: result.secure_url,
            cloudinary_id: result.public_id,
        });
        data.save();
        console.log(`✅ Tạo áo cưới thành công`.green.bold);
        res.status(200).json({
            success: true,
            message: 'Tạo áo cưới thành công',
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
});
// TODO: Gọi danh sách áo cưới
router.get('/list', async (req, res) => {
    try {
        const data = await WOModel.find();
        res.status(200).json(data);
    } catch (error) {
        return res.status(500).send(error.message);
    }
});
// TODO: Chi tiết áo cưới
router.get('/detail/:id', async (req, res) => {
    try {
        const data = await WOModel.findById(req.params.id);
        if (!data) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy áo cưới',
            });
        }
        res.status(200).json(data);
    } catch (error) {
        return res.status(500).send(error.message);
    }
});
// TODO: Sửa thông tin áo cưới
// router.put('/update/:id', upload.single('image'), async (req, res) => {
//     try {
//         const data = await WOModel.findById(req.params.id);

//         const checkField = (field) => !field;

//         const requiredFields = ['name', 'size', 'price', 'color', 'status'];
//         const missingFields = requiredFields.filter((field) => checkField(req.body[field]));

//         if (missingFields.length > 0) {
//             return res.status(400).json({
//                 success: false,
//                 message: `Vui lòng điền đầy đủ thông tin các trường còn thiếu ${missingFields.join(', ')}`,
//             });
//         }
//         if (req.file != null) {
//             await cloudinary.uploader.destroy(data.cloudinary_id);
//             const result = await cloudinary.uploader.upload(req.file.path, {
//                 folder: 'api-graduation-project/wedding-outfit',
//             });
//             data.image = result.secure_url;
//             data.cloudinary_id = result.public_id;
//         } else {
//             data.image = data.image;
//             data.cloudinary_id = data.cloudinary_id;
//         }
//         await WOModel.findByIdAndUpdate(data.id, data, {
//             new: true,
//         });
//         console.log(`✅ Sửa áo cưới thành công`.green.bold);
//         res.status(200).json({
//             success: true,
//             message: 'Sửa áo cưới thành công',
//         });
//     } catch (error) {
//         return res.status(500).send(error.message);
//     }
// });
router.put('/update/:id', upload.single('image'), async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (req.file) {
            await cloudinary.uploader.destroy(data.cloudinary_id);
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'api-graduation-project/wedding-outfit',
            });
            updates.image = result.secure_url;
            updates.cloudinary_id = result.public_id;
        }

        const options = { new: true };
        const updatedContract = await WOModel.findByIdAndUpdate(id, updates, options);

        if (!updatedContract) {
            return res.status(404).json({
                success: false,
                message: `Không tìm thấy áo cưới`,
            });
        }

        console.log(`✅ Sửa áo cưới thành công`.green.bold);

        res.status(200).json({
            success: true,
            message: `Sửa áo cưới [${id}] thành công`,
        });
    } catch (error) {
        console.error(`❗ ${error.message}`);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
// TODO: Xoá áo cưới
router.delete('/delete/:id', async (req, res) => {
    try {
        const data = await WOModel.findByIdAndDelete(req.params.id);

        if (!data) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy áo cưới',
            });
        }

        await cloudinary.uploader.destroy(data.cloudinary_id);

        console.log(`✅ Xoá áo cưới: [${data.name}] thành công`.green.bold);

        res.status(200).json({
            success: true,
            message: 'Xoá áo cưới thành công',
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
});
module.exports = router;
