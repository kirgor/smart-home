const MockTemperatureSensor = require('./server/temperatureSensor/MockTemperatureSensor');

module.exports = {
    port: 3000,
    temperatureSensor: new MockTemperatureSensor(),
    temperatureUpdateSchedule: '*/10 * * * * *',
    mongoUrl: 'mongodb://localhost/smartHome'
};