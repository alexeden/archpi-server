// config/env.js
// Select the environment configuration module to load
module.exports = require('./env/' + process.env.NODE_ENV + '.js');

