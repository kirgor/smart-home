const TemperatureSensor = require('./TemperatureSensor');
const fs = require('fs');
const childProcess = require('child_process');

class RpiTemperatureSensor extends TemperatureSensor {
    constructor(deviceFile) {
        super();
        this.deviceFile = deviceFile;
    }

    init() {
        childProcess.execSync('modprobe w1-gpio');
        childProcess.execSync('modprobe w1-therm');
    }

    getCurrentTemperature() {
        const deviceData = fs.readFileSync(this.config.deviceFile, 'utf8');
        const temperatureData = deviceData.match(/t=\d+/m);
        if (temperatureData.length === 1) {
            let t = temperatureData[0].match(/\d+/)[0];
            return parseFloat(t.substring(0, 2) + '.' + t.substring(2));
        } else {
            return null;
        }
    }
}

module.exports = RpiTemperatureSensor;