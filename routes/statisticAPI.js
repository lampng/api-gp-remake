require("colors");
// mongodb user model
const userModels = require("../models/userModel");
const clientModels = require("../models/clientModel");
const serviceModels = require("../models/ServiceModel");
const moment = require('moment');

require("dotenv").config();
var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
  res.json({
    status: "Đang phát triển",
    "Thống kê dịch vụ sử dụng nhiều nhất (GET)": "https://api-gp-remake-production.up.railway.app/statistic/popular-services",
  });
});
// TODO: Thống kê  dịch vụ sử dụng nhiều nhất
module.exports = router;