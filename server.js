


// Set the NODE_ENV environment variable to 'devlopment' if NODE_ENV not set
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('./config/express');
var gpio_config = require('./config/gpio');
var gpio = gpio_config();
console.log("GPIO", gpio);
var app = express();

/*var gpio = require('rpi-gpio');

gpio.setup(7, gpio.DIR_OUT, write);

function write() {
	gpio.write(7, true, function(err) {
		if(err) throw err;
		console.log("Written to pin 7");
	});
}*/


app.listen(3000);

console.log('Server running at http://eden-archpi:3000/');

module.exports = app;