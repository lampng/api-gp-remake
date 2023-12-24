const userAPI = require('./userAPI');
const clientAPI = require('./clientAPI');
const serviceAPI = require('./serviceAPI');
const WOAPI = require('./WOAPI');
const contractAPI = require('./contractAPI');
const workAPI = require('./workAPI');
const statisticAPI = require('./statisticAPI');

function route(app) {
    app.use('/user', userAPI);
    app.use('/client', clientAPI);
    app.use('/WeddingOutfit', WOAPI);
    app.use('/service', serviceAPI);
    app.use('/contract', contractAPI);
    app.use('/workAPI', workAPI);
    app.use('/statistic', statisticAPI);
}
module.exports = route;