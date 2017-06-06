const schedule = require('node-schedule');
const temperatureCache = require('../temperatureCache');
const TemperaturePoint = require('../mongooseModels/TemperaturePoint');
const TemperatureAggregatedPoint = require('../mongooseModels/TemperatureAggregatedPoint');
const PointAggregation = require('../../common/PointAggregation');
const config = require('../../server.config');

const dataSource = config.temperatureDataSource;
dataSource.initialize();
console.log(
    'Initialized temperature data source with ' +
    (dataSource.constructor ? dataSource.constructor.name : 'anonymous object')
);

const aggregations = [
    PointAggregation.MINUTE,
    PointAggregation.TEN_MINUTES,
    PointAggregation.HOUR,
    PointAggregation.DAY
];

schedule.scheduleJob(config.temperatureUpdateSchedule, async () => {
    const value = dataSource.getData();

    let time = new Date();
    const temperaturePoint = new TemperaturePoint({value, time});
    await temperaturePoint.save();

    aggregations.forEach(async aggregation => {
        let aggregatedPoint = await TemperatureAggregatedPoint.findByDate(time, aggregation, true);

        if (value < aggregatedPoint.min || aggregatedPoint.min === null)
            aggregatedPoint.min = value;
        if (value > aggregatedPoint.max || aggregatedPoint.max === null)
            aggregatedPoint.max = value;
        aggregatedPoint.count++;
        aggregatedPoint.sum += value;

        await aggregatedPoint.save();
    });
});
console.log(`Temperature updater scheduled with '${config.temperatureUpdateSchedule}'`);