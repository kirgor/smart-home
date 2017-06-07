const mongoose = require('mongoose');
const PointSchema = require('../schemas/PointSchema');

const TemperaturePoint = mongoose.model('TemperaturePoint', PointSchema);

module.exports = TemperaturePoint;