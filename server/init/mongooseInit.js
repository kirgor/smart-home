const mongoose = require('mongoose');
const config = require('../../server.config');

mongoose.connect(config.mongoUrl);
mongoose.Promise = Promise;

console.log('Initialized mongoose');