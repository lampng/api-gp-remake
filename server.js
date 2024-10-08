require('colors');
require('bcryptjs');
require('jsonwebtoken');
require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const path = require('path');
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
const session = require('express-session');
//connect
const db = require('./config/db');
db.connect();
// my sesions
const mongoDB_session = require("connect-mongodb-session")(session);
const secretAPI = new mongoDB_session({
    uri: "mongodb+srv://lampng:vhoOvRTkwH8oWxst@nodejs-server.omzznkp.mongodb.net/api-graduation-project?retryWrites=true&w=majority",
    collection: "mySessions",
});
app.use(
    session({
        secret: "my secret",
        resave: false,
        saveUninitialized: false,
        store: secretAPI,
        cookie: { secure: true }
    })
);

//================================================================================
// use route 
const route = require('./routes/index');
route(app)
//  cors

app.get("/", (req, res) => {
    res.json({
        status: "API ON",
        "User(Người dùng):": `http://api-gp-remake.onrender.com/user/`,
        "Client(Khách hàng):": `http://api-gp-remake.onrender.com/client/`,
        "Service(Dịch vụ):": `http://api-gp-remake.onrender.com/service/`,
        "Wedding Outfit(Áo cưới):": `http://api-gp-remake.onrender.com/WeddingOutfit/`,
        "contract(Hợp đồng):": `http://api-gp-remake.onrender.com/contract/`,
        "work(Công việc):": `http://api-gp-remake.onrender.com/work/`,
        "Statistic(Thống kê):": `http://api-gp-remake.onrender.com/statistic/`,
    })
})
const APIroute = require('./routes/userAPI');
const cors = require("cors")
app.use("/", cors({
    origin: '*'
}), APIroute)
app.get("*", (req, res) => {
    res.send("Nhập Sai Đường Dẫn!")
});
//================================================================================
// port
var port = process.env.PORT || 1102;
// running server
const log = console.log;
log(`============================`.rainbow.bold)
app.listen(port, () =>
    log("| ".rainbow + `Máy chủ đang chạy trên [http://localhost:${port}]`.green.underline.bold + " |".rainbow)
)