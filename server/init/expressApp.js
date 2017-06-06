const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const config = require('../../server.config');

const app = express();

app.use(express.static(path.resolve(__dirname, '../../public')));
app.use(bodyParser.json());
app.listen(config.port, () => console.log(`Listening on port ${config.port}`));

module.exports = app;