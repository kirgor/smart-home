const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const config = require('../server.config');
const temperatureCache = require('./temperature/temperatureCache');
const temperatureUpdater = require('./temperature/temperatureUpdater');

temperatureUpdater();

const app = express();

app.use(express.static(path.resolve(__dirname, '../public')));
app.use(bodyParser.json());
app.get('/api/temperature', (req, res) => {
    const from = parseInt(req.query.from) || 0;
    res.json(temperatureCache.getPartFrom(from));
});

app.listen(config.port);