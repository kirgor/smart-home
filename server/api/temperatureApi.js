const app = require('../init/expressApp');
const TemperaturePoint = require('../mongooseModels/TemperaturePoint');
const TemperatureAggregatedPoint = require('../mongooseModels/TemperatureAggregatedPoint');

app.get('/api/temperature', async (req, res) => {
    const from = new Date(parseInt(req.query['from']));
    const to = new Date(parseInt(req.query['to']));
    const resolution = parseInt(req.query['resolution']);

    if (resolution === 1) {
        const points = await TemperaturePoint
            .find({
                $and: [
                    {time: {$gte: from}},
                    {time: {$lt: to}}
                ]
            })
            .exec();

        res.json(points.map(point => ({
            value: point.value,
            time: point.time.getTime()
        })));
    } else {
        const points = await TemperatureAggregatedPoint
            .find({
                $and: [
                    {aggregation: resolution},
                    {to: {$gt: from}},
                    {from: {$lte: to}}
                ]
            })
            .exec();

        res.json(points.map(point => ({
            value: point.sum / point.count,
            time: point.from.getTime()
        })));
    }
});

console.log('Temperature API initialized');