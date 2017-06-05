const schedule = require('node-schedule');
const temperatureCache = require('./temperatureCache');
const config = require('../../server.config');

const temperatureUpdater = () => {
    const dataSource = config.temperatureDataSource;
    dataSource.initialize();
    console.log('Initialized temperature data source');

    schedule.scheduleJob(config.temperatureUpdateSchedule, () => {
        const value = dataSource.getData();
        temperatureCache.addHistory([{
            value,
            time: new Date().getTime()
        }]);
    });
};

module.exports = temperatureUpdater;
