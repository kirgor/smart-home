const mongoose = require('mongoose');

const PointSchema = new mongoose.Schema({
    min: {type: Number, default: 0},
    max: {type: Number, default: 0},
    count: {type: Number, default: 0},
    sum: {type: Number, default: 0},
    aggregation: {type: Number, default: 1},
    from: Date,
    to: Date
});

PointSchema.statics.aggregate = async function (value, date, aggregation) {
    const from = new Date(date.getTime() - date.getTime() % aggregation);

    const exec = this.findOne()
        .where('from').equals(from)
        .where('aggregation').equals(aggregation)
        .exec();

    const point = await exec || new this({aggregation, from, to: new Date(from.getTime() + aggregation)});

    if (point.count > 0) {
        if (value < point.min)
            point.min = value;
        if (value > point.max)
            point.max = value;
    } else {
        point.min = value;
        point.max = value;
    }
    point.count++;
    point.sum += value;

    await point.save();
};

PointSchema.statics.findForDateRange = function (from, to, aggregation) {
    return this
        .find({
            $and: [
                {aggregation},
                {to: {$gt: from}},
                {from: {$lte: to}}
            ]
        })
        .exec();
};

module.exports = PointSchema;