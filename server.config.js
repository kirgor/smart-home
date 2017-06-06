const MockTemperatureDataSource = require('./server/dataSource/MockTemperatureDataSource');
const RpiTemperatureDataSource = require('./server/dataSource/RpiTemperatureDataSource');

module.exports = {
    port: 3000,
    temperatureDataSource: new MockTemperatureDataSource(),
    temperatureUpdateSchedule: '*/10 * * * * *'
};