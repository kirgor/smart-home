const schedule = require('node-schedule');
const TemperaturePoint = require('../models/TemperaturePoint');
const PointAggregation = require('../../common/PointAggregation');
const aggregations = Object.values(PointAggregation);
const config = require('../../server.config');

const temperatureSensor = config.temperatureSensor;
temperatureSensor.init();
console.log(
    'Initialized temperature sensor with ' +
    (temperatureSensor.constructor ? temperatureSensor.constructor.name : 'anonymous object')
);

schedule.scheduleJob(config.temperatureUpdateSchedule, async () => {
    const value = temperatureSensor.getCurrentTemperature();
    const date = new Date();
    aggregations.forEach(async aggregation => await TemperaturePoint.aggregate(value, date, aggregation));
});

console.log(`Temperature updater scheduled with '${config.temperatureUpdateSchedule}'`);