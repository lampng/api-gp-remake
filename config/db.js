const mongoose = require('mongoose');
const log = console.log;
require('dotenv').config();

async function connect() {
    try {
        mongoose.Promise = global.Promise;
        await mongoose.connect(process.env.DB_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        log('| '.rainbow.bold + 'kết nối cơ sở dữ liệu thành công!'.green.underline.bold + '      |'.rainbow.bold);
        log(`============================`.rainbow.bold);
    } catch (error) {
        log('Kết nối cơ sở dữ liệu thất bại!'.red.strikethrough.bold);
    }
}
module.exports = {
    connect,
};
