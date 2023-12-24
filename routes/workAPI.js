require('colors');
// mongodb user model
const userModels = require('../models/userModel');
const clientModels = require('../models/clientModel');
const contractModels = require('../models/contractModel');
const ServiceModels = require('../models/ServiceModel');
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
      
    });
});
module.exports = router;
