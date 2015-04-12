


// Set the NODE_ENV environment variable to 'devlopment' if NODE_ENV not set
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require('./config/mongoose');
var express = require('./config/express');
var passport = require('./config/passport');
var gpio_config = require('./config/gpio');

var db = mongoose();
var app = express(db);
var passport = passport();
var gpio = gpio_config();

app.listen(3000);

console.log('Server running at http://eden-archpi:3000/');

module.exports = app;