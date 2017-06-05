const MockTemperatureDataSource = require('./server/temperature/MockTemperatureDataSource');
const TemperatureDataSource = require('./server/temperature/TemperatureDataSource');

module.exports = {
    port: 3000,
    temperatureDataSource: new MockTemperatureDataSource(),
    temperatureUpdateSchedule: '*/10 * * * * *'
};