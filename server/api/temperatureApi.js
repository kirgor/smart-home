const app = require('../init/expressInit');
const TemperaturePoint = require('../models/TemperaturePoint');
const PointAggregation = require('../../common/PointAggregation');

app.get('/api/temperature', async (req, res) => {
    const from = new Date(parseInt(req.query['from']));
    const to = new Date(parseInt(req.query['to']));
    const count = parseInt(req.query['count']);
    let resolution = req.query['resolution'] ? parseInt(req.query['resolution']) : null;

    if (count > 0) {
        const timeSpan = to.getTime() - from.getTime();
        const idealResolution = timeSpan / count;
        const aggregations = Object.values(PointAggregation);
        for (let i = 0; i < aggregations.length; i++) {
            if ((i > 0 ? aggregations[i - 1] : 0) < idealResolution && idealResolution <= aggregations[i]) {
                resolution = aggregations[i];
                break;
            }
        }
    }

    const points = await TemperaturePoint.findForDateRange(from, to, resolution);

    res.json(points.map(point => ({
        value: point.sum / point.count,
        time: point.from.getTime()
    })));
});

console.log('Temperature API initialized');