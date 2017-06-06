const mongoose = require('mongoose');

const TemperatureAggregatedPoint = mongoose.model('TemperatureAggregatedPoint', new mongoose.Schema({
    min: Number,
    max: Number,
    count: Number,
    sum: Number,
    aggregation: Number,
    from: Date,
    to: Date
}));

TemperatureAggregatedPoint.findByDate = async function (date, aggregation, create) {
    const from = new Date(date.getTime() - date.getTime() % aggregation);

    const exec = this.findOne()
        .where('from').equals(from)
        .where('aggregation').equals(aggregation)
        .exec();

    if (create) {
        return await exec || new TemperatureAggregatedPoint({
                min: null,
                max: null,
                count: 0,
                sum: 0,
                aggregation,
                from,
                to: new Date(from.getTime() + aggregation)
            });
    } else {
        return exec;
    }
};

module.exports = TemperatureAggregatedPoint;