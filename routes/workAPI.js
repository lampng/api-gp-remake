require('colors');
// mongodb user model
const userModels = require('../models/userModel');
const clientModels = require('../models/clientModel');
const contractModels = require('../models/contractModel');
const ServiceModels = require('../models/ServiceModel');
const WeddingOutfitModels = require('../models/WeddingOutfitModel');
const workmodels = require('../models/workmodel');
require('dotenv').config();
const cloudinary = require('../middleware/cloudinary.js');
const upload = require('../middleware/upload');
var express = require('express');
var router = express.Router();
const moment = require('moment');
const { rainbow } = require('colors');
const path = require('path');

router.get('/', (req, res) => {
    res.json({
        status: 'Đang phát triển',
        'Tạo loại công việc (POST):': `https://api-gp-remake-production.up.railway.app/work/create`,
        'Danh sách loại công việc (GET):': `https://api-gp-remake-production.up.railway.app/work/list`,
        'Sửa loại công việc (PUT):': `https://api-gp-remake-production.up.railway.app/work/update/:id`,
        'Xoá loại công việc (DELETE):': `https://api-gp-remake-production.up.railway.app/work/delete/:id`,
        'Thêm công việc cho nhân viên (POST):': `https://api-gp-remake-production.up.railway.app/work/add-work`,
        'Danh sách công việc của nhân viên (GET):': `https://api-gp-remake-production.up.railway.app/work/list-work`,
        'Danh sách nhân viên có thể thêm công việc trong ngày (GET):': `https://api-gp-remake-production.up.railway.app/work/list-user-add-work`,
        'Chi tiết công việc (POST):': `https://api-gp-remake-production.up.railway.app/work/detail-work/:id`,
        'Sửa công việc (PUT):': `https://api-gp-remake-production.up.railway.app/work/update-work/:id`,
        'Xoá công việc (DELETE):': `https://api-gp-remake-production.up.railway.app/work/delete-work/:id`,
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
//TODO: Danh sách nhân viên có thể thêm công việc
router.get('/list-user-add-work', async (req, res) => {
    try {
        const { date } = req.query;
        const startOfDay = moment(date, 'DD/MM/YYYY').startOf('day').toDate();
        const endOfDay = moment(date, 'DD/MM/YYYY').endOf('day').toDate();

        // Tìm kiếm công việc theo ngày
        const workList = await workmodels.work.find({ workDate: { $gte: startOfDay, $lte: endOfDay } });
        // const userList = await userModels.find();

        // // Lọc danh sách người dùng không có công việc trong ngày này
        // const usersWithoutWork = userList.filter((user) => !workList.some((work) => work.user_ID.equals(user._id)));
        const userList = await userModels.find({
            $and: [
                { disable: false },
                { _id: { $nin: workList.map((work) => work.user_ID) } }, // Loại bỏ những người đã có công việc
            ],
        });

        // Hiển thị kết quả
        res.status(200).json(userList);
    } catch (error) {
        console.log(`❗  ${error.message}`.bgRed.white.strikethrough.bold);
        res.status(500).json({
            message: error.message,
        });
    }
});
// TODO: Thêm công việc cho nhân viên
router.post('/add-work', async (req, res) => {
    try {
        const checkField = (field) => !field;

        const requiredFields = ['workType_ID', 'user_ID', 'workDate', 'address'];
        const missingFields = requiredFields.filter((field) => checkField(req.body[field]));

        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Vui lòng điền đầy đủ thông tin các trường còn thiếu ${missingFields.join(', ')}`,
            });
        }
        const workType = await workmodels.workType.findById(req.body.workType_ID);
        const user = await userModels.findById(req.body.user_ID);
        if (!workType) {
            return res.status(404).json({
                success: false,
                message: `Không tìm thấy loại công việc`,
            });
        }
        if (!user) {
            return res.status(404).json({
                success: false,
                message: `Không tìm thấy nhân viên`,
            });
        }
        const data = new workmodels.work({
            workType_ID: req.body.workType_ID,
            user_ID: req.body.user_ID,
            workDate: moment(req.body.workDate, 'HH:mm DD/MM/YYYY'),
            address: req.body.address,
            note: req.body.note,
            status: req.body.status,
        });
        // if (req.file != null) {
        //     const result = await cloudinary.uploader.upload(req.file.path, {
        //         folder: 'api-graduation-project/work-imageContract',
        //     });
        //     data.imageContract = result.secure_url;
        //     data.cloudinary_id = result.public_id;
        // }
        data.save();
        console.log(`✅ Thêm công việc cho [${user.name}] thành công`.green.bold);
        res.status(200).json({
            success: true,
            message: `Thêm công việc cho [${user.name}] thành công`,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `${error.message}`,
        });
    }
});
//TODO: Danh sách tất cả công việc - có thể tìm theo thời gian
router.get('/list-work', async (req, res) => {
    try {
        const { date } = req.query;
        let conditions = {};

        if (date) {
            const startOfDay = moment(date, 'DD/MM/YYYY').startOf('day').toDate();
            const endOfDay = moment(date, 'DD/MM/YYYY').endOf('day').toDate();

            conditions = {
                workDate: { $gte: startOfDay, $lte: endOfDay },
            };

            conditions.workDate = { $gte: startOfDay, $lte: endOfDay };
        }

        const list = await workmodels.work
            .find({ ...conditions })
            .populate({
                path: 'workType_ID',
                model: 'worktype',
            })
            .populate({ path: 'user_ID', model: 'user', select: 'name role email phone avatar gender birthday' })
            .exec();
        if (list.length === 0) {
            return res.status(404).json({
                success: false,
                message: `Không tìm thấy công việc trong ngày [${date}].`,
            });
        }
        list.sort((a, b) => {
            return new Date(b.workDate) - new Date(a.workDate);
        });
        res.status(200).json(list);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `${error.message}`,
        });
    }
});
//TODO: Danh sách công việc của nhân viên - có thể tìm theo thời gian
router.get('/user-work/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const { date } = req.query;
        let conditions = {};

        if (date) {
            const startOfDay = moment(date, 'DD/MM/YYYY').startOf('day').toDate();
            const endOfDay = moment(date, 'DD/MM/YYYY').endOf('day').toDate();

            conditions = {
                workDate: { $gte: startOfDay, $lte: endOfDay },
            };

            conditions.workDate = { $gte: startOfDay, $lte: endOfDay };
        }

        const list = await workmodels.work
            .find({ user_ID: userId, ...conditions }) // Sử dụng spread operator để kết hợp điều kiện
            .populate({
                path: 'workType_ID',
                model: 'worktype',
            })
            .populate({
                path: 'user_ID',
                model: 'user',
                select: 'name role email phone avatar gender birthday',
            })
            .exec();

        if (list.length === 0) {
            return res.status(404).json({
                success: false,
                message: `Không tìm thấy công việc của người dùng trong ngày [${date}].`,
            });
        }
        list.sort((a, b) => {
            return new Date(b.workDate) - new Date(a.workDate);
        });
        res.status(200).json(list);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `${error.message}`,
        });
    }
});
// TODO: Chi tiết công việc
router.get('/detail-work/:id', async (req, res) => {
    try {
        const list = await workmodels.work
            .findById(req.params.id)
            .populate({
                path: 'workType_ID',
                model: 'worktype',
            })
            .populate({ path: 'user_ID', model: 'user', select: 'name role email phone avatar gender birthday' })
            .exec();

        if (!list || list.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy công việc.',
            });
        }

        res.status(200).json(list);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `${error.message}`,
        });
    }
});
// TODO: Cập nhập công việc
router.put('/update-work/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const options = { new: true };
        const updateWork = await workmodels.work.findByIdAndUpdate(id, updates, options);

        const user = await userModels.findById(updateWork.user_ID);
        const workType = await workmodels.workType.findById(updateWork.workType_ID);

        if (!updateWork) {
            return res.status(404).json({
                success: false,
                message: `Không tìm thấy công việc`,
            });
        }

        console.log(`✅ Sửa công việc [${workType.name}] của [${user.name}] thành công`.green.bold);

        res.status(200).json({
            success: true,
            message: `Sửa công việc [${workType.name}] của [${user.name}] thành công`,
        });
    } catch (error) {
        console.error(`❗ ${error.message}`);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
// TODO: Xoá công việc
router.delete('/delete-work/:id', async (req, res) => {
    try {
        const work = await workmodels.work.findByIdAndDelete(req.params.id);
        const user = await userModels.findById(work.user_ID);
        const workType = await workmodels.workType.findById(work.workType_ID);

        // if (work.cloudinary_id) {
        //     await cloudinary.uploader.destroy(work.cloudinary_id);
        //     console.log(`✅ Đã xoá ảnh trên Cloudinary của công việc: ${work.cloudinary_id}`);
        // }

        console.log(`✅ công việc [${workType.name}] của [${user.name}] đã được xóa thành công`.green.bold);
        
        res.status(200).json({
            status: true,
            message: `công việc [${workType.name}] của [${user.name}] đã được xóa thành công`,
        });
    } catch (error) {
        console.log(`❗  Không tìm thấy công việc`.bgRed.white.strikethrough.bold);
        res.status(500).json({
            status: false,
            message: 'Không tìm thấy công việc hoặc có lỗi xảy ra',
        });
    }
});
module.exports = router;
