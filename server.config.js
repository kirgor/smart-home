const MockTemperatureDataSource = require('./server/temperature/MockTemperatureDataSource');
const TemperatureDataSource = require('./server/temperature/TemperatureDataSource');

module.exports = {
    temperatureDataSource: new MockTemperatureDataSource(),
    temperatureUpdateSchedule: '*/10 * * * * *'
};