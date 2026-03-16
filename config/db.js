const mongoose = require('mongoose');
const log = console.log;

async function connect() {
    try {
        mongoose.Promise = global.Promise
    //  mongodb+srv://lampng1102_db_user:JkEcmrk2G6MQQyF6@nodejs-server.v0abjeo.mongodb.net/api-graduation-project?appName=nodejs-server
        await mongoose.connect('mongodb+srv://lampng1102_db_user:JkEcmrk2G6MQQyF6@nodejs-server.v0abjeo.mongodb.net/api-graduation-project?appName=nodejs-server', {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        log("| ".rainbow.bold + "kết nối cơ sở dữ liệu thành công!".green.underline.bold + "      |".rainbow.bold);
        log(`============================`.rainbow.bold)
    } catch (error) {
        log("Kết nối cơ sở dữ liệu thất bại!".red.strikethrough.bold);
    }
}
module.exports = {
    connect
};
