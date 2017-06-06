const mongoose = require('mongoose');

const TemperaturePoint = mongoose.model('TemperaturePoint', new mongoose.Schema({
    value: Number,
    time: Date
}));

module.exports = TemperaturePoint;