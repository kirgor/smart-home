const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
mongoose.Promise = Promise;

console.log('Initialized mongoose');