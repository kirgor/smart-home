const TemperatureSensor = require('./TemperatureSensor');

class MockTemperatureSensor extends TemperatureSensor {
    getCurrentTemperature() {
        return 20 + (Math.random() - 0.5) * 2;
    }
}

module.exports = MockTemperatureSensor;