const DataSource = require('../DataSource');

class MockTemperatureDataSource extends DataSource {
    getData() {
        return 20 + (Math.random() - 0.5) * 2;
    }
}

module.exports = MockTemperatureDataSource;