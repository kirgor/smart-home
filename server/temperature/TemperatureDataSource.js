const DataSource = require('../DataSource');
const fs = require('fs');
const childProcess = require('child_process');

class TemperatureDataSource extends DataSource {
    /**
     * @param config.deviceFile
     */
    constructor(config) {
        super();
        this.config = config;
    }

    initialize() {
        childProcess.execSync('modprobe w1-gpio');
        childProcess.execSync('modprobe w1-therm');
    }

    getData() {
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

module.exports = TemperatureDataSource;